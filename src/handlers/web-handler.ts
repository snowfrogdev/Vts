import { AbstractHandler } from "./abstract-handler";
import { GluegunToolbox } from "gluegun";
import { NewCommandRequest } from "../commands/new";

export class WebHandler extends AbstractHandler {
    constructor(private toolbox: GluegunToolbox) {
        super()
    }

    public async handle(request: NewCommandRequest) {
        if (request.typeOfProject === 'Web') {
            const name = request.name
            
            await this.toolbox.template.generate({
                template: 'web/package.json.ejs',
                target: `${name}/package.json`,
                props: { name }
            })

            await this.toolbox.template.generate({
                template: 'web/index.html.ejs',
                target: `${name}/src/index.html`,
                props: { name }
            })

            await this.toolbox.template.generate({
                template: 'web/index.ts.ejs',
                target: `${name}/src/index.ts`,
                props: { name }
            })

            await this.toolbox.template.generate({
                template: 'web/style.css.ejs',
                target: `${name}/src/style.css`,
                props: { name }
            })
        }
        return super.handle(request)
    }
}