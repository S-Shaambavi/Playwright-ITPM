const fs = require('fs');
const path = require('path');

class MarkdownReporter {
  constructor(options) {
    this.reportDir = path.join(process.cwd(), 'Report');
    this.reportPath = path.join(this.reportDir, 'report.md');
    this.results = [];
  }

  onBegin(config, suite) {
    // Create Report directory if it doesn't exist
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
    
    // Clear previous results
    this.results = [];
    
    // Print clean header
    console.log('\n🧪 Running Thanglish to Tamil Transliteration Tests\n');
  }

  onTestEnd(test, result) {
    const testTitle = test.title;
    const testId = testTitle.match(/(Pos_Fun_\d+|Neg_Fun_\d+)/)?.[0] || 'N/A';
    
    // Extract input, expected, and actual from console logs
    let input = 'N/A';
    let expectOutput = 'N/A';
    let actualOutput = 'N/A';
    
    if (result.stdout && result.stdout.length > 0) {
      const logs = result.stdout.map(s => s.text || s.toString()).join('\n');
      
      const inputMatch = logs.match(/Input:\s*(.+)/);
      const expectedMatch = logs.match(/Expected:\s*(.+)/);
      const actualMatch = logs.match(/Actual:\s*(.+)/);
      
      if (inputMatch) input = inputMatch[1].trim();
      if (expectedMatch) expectOutput = expectedMatch[1].trim();
      if (actualMatch) actualOutput = actualMatch[1].trim();
    }
    
    const status = result.status === 'passed' ? 'PASS' : 'FAIL';
    
    this.results.push({
      testId,
      testTitle,
      input,
      expectOutput,
      actualOutput,
      status,
      browser: test.parent.project()?.name || 'unknown'
    });
  }

  onEnd(result) {
    // Print clean terminal summary
    console.log('\n═══════════════════════════════════════════════════\n');
    console.log('📊 POSITIVE FUNCTIONAL TESTS\n');
    
    const positiveTests = this.results.filter(r => r.testId.startsWith('Pos_Fun'))
      .sort((a, b) => a.testId.localeCompare(b.testId));
    positiveTests.forEach(r => {
      const icon = r.status === 'PASS' ? '✅' : '❌';
      console.log(`${r.testId} - ${icon} ${r.status}`);
    });
    
    console.log('\n📊 NEGATIVE FUNCTIONAL TESTS\n');
    
    const negativeTests = this.results.filter(r => r.testId.startsWith('Neg_Fun'))
      .sort((a, b) => a.testId.localeCompare(b.testId));
    negativeTests.forEach(r => {
      const icon = r.status === 'PASS' ? '✅' : '❌';
      console.log(`${r.testId} - ${icon} ${r.status}`);
    });
    
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log(`\n✅ ${passed} passed | ❌ ${failed} failed`);
    console.log(`\n📄 Report: ${this.reportPath}\n`);
    
    // Generate markdown report
    let markdown = '# Test Execution Report\n\n';
    markdown += `**Date:** ${new Date().toLocaleString()}\n\n`;
    markdown += `**Total Tests:** ${this.results.length}\n`;
    markdown += `**Passed:** ${passed}\n`;
    markdown += `**Failed:** ${failed}\n\n`;
    markdown += '---\n\n';
    
    // Group by test case ID
    const uniqueTests = {};
    this.results.forEach(r => {
      if (!uniqueTests[r.testId]) {
        uniqueTests[r.testId] = r;
      }
    });
    
    // Sort tests: Positive first, then Negative
    const sortedTests = Object.values(uniqueTests).sort((a, b) => {
      // Extract type and number
      const aIsPos = a.testId.startsWith('Pos_Fun');
      const bIsPos = b.testId.startsWith('Pos_Fun');
      
      // Positive tests come first
      if (aIsPos && !bIsPos) return -1;
      if (!aIsPos && bIsPos) return 1;
      
      // Within same type, sort by number
      return a.testId.localeCompare(b.testId);
    });
    
    sortedTests.forEach((testResult, index) => {
      markdown += `## ${testResult.testId}\n\n`;
      markdown += `**Test Case:** ${testResult.testTitle}\n\n`;
      markdown += `**Input:** ${testResult.input}\n`;
      markdown += `**Expect Output:** ${testResult.expectOutput}\n`;
      markdown += `**Actual Output:** ${testResult.actualOutput}\n`;
      markdown += `**Result:** ${testResult.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}\n\n`;
      markdown += '---\n\n';
    });
    
    // Write to file
    fs.writeFileSync(this.reportPath, markdown, 'utf8');
  }
}

module.exports = MarkdownReporter;
