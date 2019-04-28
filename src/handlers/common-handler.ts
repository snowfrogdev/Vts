import { AbstractHandler } from "./abstract-handler";
import { GluegunToolbox } from "gluegun";
import { NewCommandRequest } from "../commands/new";

export class CommonHandler extends AbstractHandler {
    constructor(private toolbox: GluegunToolbox) {
        super()
    }

    public async handle(request: NewCommandRequest) {
        const name = request.name
        
        await this.toolbox.template.generate({
            template: 'common/tsconfig.json.ejs',
            target: `${name}/tsconfig.json`
        })

        await this.toolbox.system.run(`cd ${name} && npm install`)

        return super.handle(request)
    }
}