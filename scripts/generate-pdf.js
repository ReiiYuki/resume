#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RESUME_JSON_PATH = path.join(__dirname, '..', 'resume.json');
const BACKUP_PATH = path.join(__dirname, '..', 'resume.json.backup');

function log(message) {
  console.log(`[PDF Generator] ${message}`);
}

function backupResumeJson() {
  log('Creating backup of resume.json...');
  fs.copyFileSync(RESUME_JSON_PATH, BACKUP_PATH);
}

function removePdfUrl() {
  log('Removing pdfUrl from resume.json...');
  const resumeData = JSON.parse(fs.readFileSync(RESUME_JSON_PATH, 'utf8'));
  
  // Store the original pdfUrl for restoration
  const originalPdfUrl = resumeData.basics?.pdfUrl;
  
  if (originalPdfUrl) {
    // Remove the pdfUrl field
    delete resumeData.basics.pdfUrl;
    
    // Write the modified resume.json
    fs.writeFileSync(RESUME_JSON_PATH, JSON.stringify(resumeData, null, 2));
    log(`Removed pdfUrl: ${originalPdfUrl}`);
    
    // Store the original pdfUrl in a temporary file for restoration
    fs.writeFileSync(path.join(__dirname, '..', '.pdfurl.tmp'), originalPdfUrl);
  } else {
    log('No pdfUrl found in resume.json');
  }
}

function generatePdf() {
  log('Generating PDF with resumed...');
  try {
    // Set Puppeteer launch options for CI environments
    const env = { ...process.env };
    
    // If PUPPETEER_ARGS is set (from CI), use those arguments
    if (process.env.PUPPETEER_ARGS) {
      // Set multiple environment variables that different tools might use
      env.PUPPETEER_LAUNCH_ARGS = process.env.PUPPETEER_ARGS;
      env.CHROME_ARGS = process.env.PUPPETEER_ARGS;
      env.PUPPETEER_ARGS = process.env.PUPPETEER_ARGS;
      
      // Set specific Puppeteer environment variables
      env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD || 'false';
      
      // Use the executable path if provided
      if (process.env.PUPPETEER_EXECUTABLE_PATH) {
        env.PUPPETEER_EXECUTABLE_PATH = process.env.PUPPETEER_EXECUTABLE_PATH;
        log(`Using Chrome executable: ${process.env.PUPPETEER_EXECUTABLE_PATH}`);
      }
      
      log(`Using Puppeteer args: ${process.env.PUPPETEER_ARGS}`);
    }
    
    // Add display environment for headless mode
    if (!env.DISPLAY) {
      env.DISPLAY = ':99';
    }
    
    execSync('resumed export -o resume.pdf --theme jsonresume-theme-macchiato-custom', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
      env
    });
    log('PDF generation completed successfully');
  } catch (error) {
    log('Error during PDF generation:');
    console.error(error.message);
    throw error;
  }
}

function restorePdfUrl() {
  log('Restoring pdfUrl to resume.json...');
  
  const tempPdfUrlPath = path.join(__dirname, '..', '.pdfurl.tmp');
  
  if (fs.existsSync(tempPdfUrlPath)) {
    const originalPdfUrl = fs.readFileSync(tempPdfUrlPath, 'utf8');
    const resumeData = JSON.parse(fs.readFileSync(RESUME_JSON_PATH, 'utf8'));
    
    // Restore the pdfUrl
    if (!resumeData.basics) {
      resumeData.basics = {};
    }
    resumeData.basics.pdfUrl = originalPdfUrl;
    
    // Write the restored resume.json
    fs.writeFileSync(RESUME_JSON_PATH, JSON.stringify(resumeData, null, 2));
    
    // Clean up temporary file
    fs.unlinkSync(tempPdfUrlPath);
    
    log(`Restored pdfUrl: ${originalPdfUrl}`);
  } else {
    log('No pdfUrl to restore');
  }
}

function restoreFromBackup() {
  log('Restoring resume.json from backup...');
  if (fs.existsSync(BACKUP_PATH)) {
    fs.copyFileSync(BACKUP_PATH, RESUME_JSON_PATH);
    fs.unlinkSync(BACKUP_PATH);
    log('Resume.json restored from backup');
  }
}

function cleanup() {
  // Clean up backup file
  if (fs.existsSync(BACKUP_PATH)) {
    fs.unlinkSync(BACKUP_PATH);
  }
  
  // Clean up temporary pdfUrl file
  const tempPdfUrlPath = path.join(__dirname, '..', '.pdfurl.tmp');
  if (fs.existsSync(tempPdfUrlPath)) {
    fs.unlinkSync(tempPdfUrlPath);
  }
}

async function main() {
  try {
    log('Starting PDF generation process...');
    
    // Step 1: Backup original resume.json
    backupResumeJson();
    
    // Step 2: Remove pdfUrl from resume.json
    removePdfUrl();
    
    // Step 3: Generate PDF
    generatePdf();
    
    // Step 4: Restore pdfUrl
    restorePdfUrl();
    
    // Step 5: Cleanup
    cleanup();
    
    log('PDF generation process completed successfully!');
    log('Generated: resume.pdf');
    
  } catch (error) {
    log('Error occurred during PDF generation process');
    console.error(error);
    
    // Restore from backup in case of error
    restoreFromBackup();
    cleanup();
    
    process.exit(1);
  }
}

// Handle process interruption
process.on('SIGINT', () => {
  log('Process interrupted, cleaning up...');
  restoreFromBackup();
  cleanup();
  process.exit(1);
});

process.on('SIGTERM', () => {
  log('Process terminated, cleaning up...');
  restoreFromBackup();
  cleanup();
  process.exit(1);
});

main();
