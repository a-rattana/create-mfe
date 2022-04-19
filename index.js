#! /usr/bin/env node
import chalk from "chalk"
import fse from "fs-extra"
import { execa } from "execa"
import { Command } from "commander"
import ora from "ora"
import path from "path"

const spinner = ora().start()

const getDirectories = (srcPath) => {
  return fse
    .readdirSync(srcPath)
    .filter((file) => fse.statSync(path.join(srcPath, file)).isDirectory())
}

new Command()
  .arguments("<project-directory>")
  .option("--template <type>", "Select template", "javascript")
  .action(async (name, options) => {
    try {
      const templates = getDirectories("./templates")
      if (!templates.includes(options.template)) {
        throw Error(`Invalid template, must be: ${templates.join(", ")}`)
      }
      if (fse.existsSync(`./${name}`)) {
        throw Error(`Folder ${name} already exists, use a different name.`)
      }
      // Init create-react-app
      spinner.start(
        chalk.green(`Creating react app with module federation: ${name}\n`)
      )
      const tempDir = `_tmp_${Date.now()}`
      await execa("npx", ["degit", "8x8/create-mfe", tempDir, "--mode=git"])
      process.chdir(`./${tempDir}/templates/${options.template}`)

      // Modify package.json
      const file = "package.json"
      const packageJson = fse.readFileSync(file, "utf8")
      const content = JSON.parse(packageJson)
      content.name = name
      fse.writeFileSync(file, JSON.stringify(content, null, 2))
      process.chdir("../../../")
      fse.copySync(`./${tempDir}/templates/${options.template}`, `./${name}`)
      fse.removeSync(`./${tempDir}`)
      spinner.succeed()

      spinner.succeed(
        chalk.green(
          `You're good to go! To get started: \n\ncd ${name}\nyarn\nyarn start`
        )
      )
      process.exit()
    } catch (e) {
      spinner.fail(chalk.red(`${e}`))
      process.exit(1)
    }
  })
  .parse(process.argv)
