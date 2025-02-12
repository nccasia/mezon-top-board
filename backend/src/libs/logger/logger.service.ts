import { ConsoleLogger, LoggerService } from "@nestjs/common";

const ignoreContext = ["RoutesResolver", "InstanceLoader", "RouterExplorer"];

export class Logger extends ConsoleLogger implements LoggerService {
  log(message: string, context?: string) {
    if (!ignoreContext.find((e) => context?.includes(e))) {
      super.log(message, context || this.context);
    }
  }

  error(message: string, trace: string, context?: string) {
    super.error(message, trace, context || this.context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context || this.context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context || this.context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context || this.context);
  }
}
