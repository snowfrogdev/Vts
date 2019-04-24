import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      prompt,
      template: { generate },
      print: { info, spin, colors },
      filesystem,
      system
    } = toolbox
    const name = parameters.first

    const spinner = spin('Generating files and installing dependencies')

    await generate({
      template: 'package.json.ejs',
      target: `${name}/package.json`,
      props: { name }
    })

    await generate({
      template: 'rollup.config.js.ejs',
      target: `${name}/rollup.config.js`,
      props: { name }
    })

    await generate({
      template: 'tsconfig.json.ejs',
      target: `${name}/tsconfig.json`
    })

    await filesystem.appendAsync(`${name}/src/main.ts`, '')

    await system.run(`cd ${name} && npm install`)

    spinner.stop()

    const initGitRepo = await prompt.confirm(
      'Do you want to initialize a Git repository?'
    )

    if (initGitRepo) {
      await generate({
        template: '.gitignore.ejs',
        target: `${name}/.gitignore`
      })

      await system.run(
        `cd ${name} && git init && git add . && git commit -m "initial commit"`
      )
    }

    info(
      colors.success(`
        Generated new Vanilla TypeScript project ${name}.

        Next:
          $ cd ${name}
          $ npm run dev
        `)
    )
  }
}
