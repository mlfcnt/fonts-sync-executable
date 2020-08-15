const { exec } = require("child_process");

const startProcess = (cmd, dir) => {
  exec(cmd, { cwd: `src/${dir}` }, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

const startServer = () => {
  startProcess("yarn start", "server");
};
const startClient = () => {
  startProcess("yarn start", "client");
};

module.exports = {
  startServer,
  startClient,
};
