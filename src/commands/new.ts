import { GluegunToolbox } from 'gluegun'

module.exports = {
    name: 'new',
    alias: ['n'],
    run: async (toolbox: GluegunToolbox) => {
        const {
            parameters,
            template: { generate },
            print: { info },
            filesystem,
            system,
        } = toolbox
        const name = parameters.first

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

        await generate({
            template: '.gitignore.ejs',
            target: `${name}/.gitignore`
        })

        await filesystem.appendAsync(`${name}/src/main.ts`, '')

        await system.run(`cd ${name} && npm install && git init && git add . && git commit -m "initial commit"`)


        info(`Generated new Vanilla TypeScript project ${name}`)
    }
}