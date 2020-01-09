import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import * as path from 'path';

export default function(schema: any): Rule {
  if (!schema.name.startsWith('data-access-')) {
    throw new Error(`Data-access lib names should start with 'data-access-'`);
  }

  schema.dir = schema.dir || '';

  const stateName = schema.name.replace('data-access-', '');
  const nested = !!schema.nested;
  const tags = schema.tags || (nested ? `scope:${stateName},type:data-access` : 'type:data-access');
  const dir = schema.dir;

  const libName = nested ? 'data-access' : schema.name;
  const libModuleDir = path.join('libs', dir, libName, 'src', 'lib');

  const projectName = dir ? dir.replace(/\//g, '-') + '-' + libName : libName;
  const libModuleName = projectName + '.module.ts';

  return chain([
    externalSchematic('@nrwl/schematics', 'lib', {
      name: libName,
      tags,
      directory: dir,
      unitTestRunner: 'jest'
    }),
    externalSchematic('va-schematics', 'ngrx', {
      name: stateName,
      module: path.join(libModuleDir, libModuleName),
      facade: true
    }),
    externalSchematic('@schematics/angular', 'service', {
      name: path.join('services', `${stateName}-data`),
      project: projectName
    })
  ]);
}
