import { AbstractHandler } from "./abstract-handler";
import { GluegunToolbox } from "gluegun";
import { NewCommandRequest } from "../commands/new";

export class GitHandler extends AbstractHandler {
    constructor(private toolbox: GluegunToolbox) {
        super()
    }

    public async handle(request: NewCommandRequest) {
        if (request.initializeGitRepo) {
            const name = request.name
            await this.toolbox.template.generate({
                template: 'common/.gitignore.ejs',
                target: `${name}/.gitignore`
            })

            await this.toolbox.system.run(
                `cd ${name} && git init && git add . && git commit -m "initial commit"`
            )
        }
        return super.handle(request)
    }
}