import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      prompt,
      template: { generate },
      print: { success, spin },
      filesystem,
      system
    } = toolbox
    const name = parameters.first

    const askTypeOfProject = {
      type: 'list',
      name: 'typeOfProject',
      message:
        'What type of project is this?',
      choices: ['Web', 'Library']
    }

    const askInitGitRepo = {
      type: 'confirm',
      name: 'initGitRepo',
      message:
        'Do you want to initialize a Git repository?'
    }

    const { typeOfProject, initGitRepo } = await prompt.ask([askTypeOfProject, askInitGitRepo])

    const spinner = spin('Generating files and installing dependencies')
    if (typeOfProject === 'Library') {
      // Library project
      await generate({
        template: 'library/package.json.ejs',
        target: `${name}/package.json`,
        props: { name }
      })

      await generate({
        template: 'library/rollup.config.js.ejs',
        target: `${name}/rollup.config.js`,
        props: { name }
      })

      await filesystem.appendAsync(`${name}/src/main.ts`, '')
    } else {
      // Web project
      await generate({
        template: 'web/package.json.ejs',
        target: `${name}/package.json`,
        props: { name }
      })

      await generate({
        template: 'web/index.html.ejs',
        target: `${name}/src/index.html`,
        props: { name }
      })

      await generate({
        template: 'web/index.ts.ejs',
        target: `${name}/src/index.ts`,
        props: { name }
      })

      await generate({
        template: 'web/style.css.ejs',
        target: `${name}/src/style.css`,
        props: { name }
      })
    }

    // Common
    await generate({
      template: 'common/tsconfig.json.ejs',
      target: `${name}/tsconfig.json`
    })

    await system.run(`cd ${name} && npm install`)

    if (initGitRepo) {
      await generate({
        template: 'common/.gitignore.ejs',
        target: `${name}/.gitignore`
      })

      await system.run(
        `cd ${name} && git init && git add . && git commit -m "initial commit"`
      )
    }

    spinner.stop()

    success(`
        Done! Generated new Vanilla TypeScript project ${name}.

        Next:
          $ cd ${name}
          $ npm run dev
    `)
  }
}
