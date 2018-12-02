import { NgModule } from '@angular/core';

import { EmployeeExerciseSharedLibsModule } from './';

@NgModule({
    imports: [EmployeeExerciseSharedLibsModule],
    declarations: [],
    exports: [EmployeeExerciseSharedLibsModule]
})
export class EmployeeExerciseSharedCommonModule {}
