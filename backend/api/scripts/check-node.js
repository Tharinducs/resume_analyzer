const major = Number(process.versions.node.split('.')[0]);
if (major < 18) {
  console.error(`❌ Node 18+ required. Current: ${process.versions.node}`);
  process.exit(1);
}else {
  console.log(`✅ Node version check passed: ${process.versions.node}`);
}