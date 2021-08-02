const { registerCode } = require("./request");
const fs = require("fs");
const errorResponse = require("./error-response");
const chalk = require("chalk");

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.log(
    `${chalk.bgRedBright(`Token không tồn tại hoặc không có, hãy thử lại!`)}`
  );
  return;
}

fs.readFile("code.txt", { encoding: "utf-8" }, async (err, data) => {
  if (err) {
    throw err;
  }

  const codes = data.split("\n");

  for (let i = 0; i < codes.length; i++) {
    const response = await registerCode(TOKEN, codes[i]);
    console.log();
    console.log(chalk.cyan(codes[i]), " => ", response);
    if (response.error === "ERROR__ENTER_CODE_AMOUNT_OUT_OF_QUOTA") {
      console.log("Hoàn tất đạt tới giới hạn tối đa của sinh nhật");
      break;
    } else {
      console.log(chalk.red(errorResponse[response.error] || response.error));
    }
  }
});
