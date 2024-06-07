import { NgModule } from "@angular/core";
import { ConfirmDirective } from "./directives/confirm.directive";
import { AutoCompletePipe } from "./pipes/autocomplete.pipe";
import { ExtensionPipe } from "./pipes/extension.pipe";
import { PluralPipe } from "./pipes/plural.pipe";

const imports = [ConfirmDirective, AutoCompletePipe, ExtensionPipe, PluralPipe]

@NgModule({
    imports: imports,
    exports: imports
})
export class SharedModule {}