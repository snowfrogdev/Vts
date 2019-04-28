import { GluegunToolbox } from 'gluegun'
import { LibraryHandler } from '../handlers/library-handler';
import { WebHandler } from '../handlers/web-handler';
import { CommonHandler } from '../handlers/common-handler';
import { GitHandler } from '../handlers/git-handler';

export interface NewCommandRequest {
  name: string
  typeOfProject: string
  initializeGitRepo: string
}

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      prompt,
      print: { success, spin },
    } = toolbox

    const name = parameters.first

    const libraryHandler = new LibraryHandler(toolbox)
    const webHandler = new WebHandler(toolbox)
    const commonHandler = new CommonHandler(toolbox)
    const gitHandler = new GitHandler(toolbox)

    libraryHandler
      .setNext(webHandler)
      .setNext(commonHandler)
      .setNext(gitHandler)


    const askTypeOfProject = {
      type: 'list',
      name: 'typeOfProject',
      message:
        'What type of project is this?',
      choices: ['Web', 'Library']
    }

    const askInitializeGitRepo = {
      type: 'confirm',
      name: 'initializeGitRepo',
      message:
        'Do you want to initialize a Git repository?'
    }

    const { typeOfProject, initializeGitRepo } = await prompt.ask([askTypeOfProject, askInitializeGitRepo])

    const request: NewCommandRequest = { name, typeOfProject, initializeGitRepo }

    const spinner = spin('Generating files and installing dependencies')    

    await libraryHandler.handle(request)    
    
    spinner.stop()

    success(`
        Done! Generated new Vanilla TypeScript project ${name}.

        Next:
          $ cd ${name}
          $ npm run dev
    `)
  }
}
