import { AbstractHandler } from "./abstract-handler";
import { GluegunToolbox } from "gluegun";
import { NewCommandRequest } from "../commands/new";

export class LibraryHandler extends AbstractHandler {
    constructor(private toolbox: GluegunToolbox) {
        super()
    }
    
    public async handle(request: NewCommandRequest) {
        if (request.typeOfProject === 'Library') {
            const name = request.name
            
            await this.toolbox.template.generate({
                template: 'library/package.json.ejs',
                target: `${name}/package.json`,
                props: { name }
            })

            await this.toolbox.template.generate({
                template: 'library/rollup.config.js.ejs',
                target: `${name}/rollup.config.js`,
                props: { name }
            })

            await this.toolbox.filesystem.appendAsync(`${name}/src/main.ts`, '')
        }
        return super.handle(request)
    }
}