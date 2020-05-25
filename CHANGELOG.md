# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/valueadd-poland/pimp-my-pr/compare/1.2.0...2.0.0) (2020-05-25)


### ⚠ BREAKING CHANGES

* **security:** new auth environment variables

### Features

* **pmp:** allow to add gitlab repo settings ([53c2bb5](https://github.com/valueadd-poland/pimp-my-pr/commit/53c2bb56b1ee0472f5becaeb09177c2ad1386c9e)), closes [#159](https://github.com/valueadd-poland/pimp-my-pr/issues/159)
* **pmp:** edit repository in settings - backend ([69c3522](https://github.com/valueadd-poland/pimp-my-pr/commit/69c3522112f3bbf805a22da976b5e8290a9cdc02)), closes [#107](https://github.com/valueadd-poland/pimp-my-pr/issues/107)
* **pmp:** edit repository in settings - front ([8b0ebe8](https://github.com/valueadd-poland/pimp-my-pr/commit/8b0ebe8752550b9fc1b0ae7f7aaaca35ea41e6cf)), closes [#107](https://github.com/valueadd-poland/pimp-my-pr/issues/107)
* **pmp:** single repository statistics changes ([a0531bd](https://github.com/valueadd-poland/pimp-my-pr/commit/a0531bd72c26dda72be689166f3fb2a471c64f14)), closes [#217](https://github.com/valueadd-poland/pimp-my-pr/issues/217)
* **pmp-api:** get info about gitlab repo MR and reviewer ([02cdbdc](https://github.com/valueadd-poland/pimp-my-pr/commit/02cdbdc39684a32d6d5dde66a7f4508e81141466)), closes [#159](https://github.com/valueadd-poland/pimp-my-pr/issues/159)
* **security:** encrypt remote token in jwt ([0b1856d](https://github.com/valueadd-poland/pimp-my-pr/commit/0b1856df09367c3d5ef82939af963f2fdb56a2e9))


### Bug Fixes

* **api:** remove 500 error bitbucket repository with no pr ([d900d72](https://github.com/valueadd-poland/pimp-my-pr/commit/d900d7241cae3ae301d7855a8306b43069604ad0)), closes [#237](https://github.com/valueadd-poland/pimp-my-pr/issues/237)
* **api-user:** handle user not found on user info ([6d18304](https://github.com/valueadd-poland/pimp-my-pr/commit/6d183043abd91ee0965786d800308c4f3db6c9ba))
* **pmp:** invalid import in gitlab-repository ([dc00e4e](https://github.com/valueadd-poland/pimp-my-pr/commit/dc00e4efb7f879fc79edb9bd9cb9e8b22ff4f4ba)), closes [#159](https://github.com/valueadd-poland/pimp-my-pr/issues/159)
* **pmp-api:** remove empty repositories from reviewer statistics ([4feb001](https://github.com/valueadd-poland/pimp-my-pr/commit/4feb001482d51f5946c88b100a5ffd75071877f8))
* **web-repository:** standardize empty values ([808053c](https://github.com/valueadd-poland/pimp-my-pr/commit/808053c68d84261a298294d0ed8de5446dedfc71))

### [1.2.1](https://github.com/valueadd-poland/pimp-my-pr/compare/1.2.0...1.2.1) (2020-05-25)


### Bug Fixes

* **api:** remove 500 error bitbucket repository with no pr ([ae48442](https://github.com/valueadd-poland/pimp-my-pr/commit/ae4844257d753d1dc8dc16d2064e9ca94edcd00f)), closes [#237](https://github.com/valueadd-poland/pimp-my-pr/issues/237)
* **api-user:** handle user not found on user info ([15ee3e7](https://github.com/valueadd-poland/pimp-my-pr/commit/15ee3e73d82647504afade32b25513b132c0f2c9))
* **pmp-api:** remove empty repositories from reviewer statistics ([17bf87e](https://github.com/valueadd-poland/pimp-my-pr/commit/17bf87e7caa7a3a6366420634ba620ca0f5e4817))
* **web-repository:** standardize empty values ([fc2587b](https://github.com/valueadd-poland/pimp-my-pr/commit/fc2587b9390b128cad3fcc583897f1a6bcff0cd8))

## [1.2.0](https://github.com/valueadd-poland/pimp-my-pr/compare/1.1.0...1.2.0) (2020-04-28)


### Features

* code of conduct ([123d501](https://github.com/valueadd-poland/pimp-my-pr/commit/123d50116aea2bf3aca439600dfb300bb2a1b81d))


### Bug Fixes

* **pmp-web:** decrease access to github ([68afdcd](https://github.com/valueadd-poland/pimp-my-pr/commit/68afdcdcc7f68460ff3ab2f71dddef10e1dddc74))
* **pmp-web:** hide not available platforms ([2cdb134](https://github.com/valueadd-poland/pimp-my-pr/commit/2cdb13460529cd1919328825159efe1acb6695e6))

## [1.1.0](https://github.com/valueadd-poland/pimp-my-pr/compare/1.0.0...1.1.0) (2020-04-26)


### Features

* **pmp:** display user info in navbar ([063b246](https://github.com/valueadd-poland/pimp-my-pr/commit/063b246f558c6b1230f73a20d698f0b133267cdc)), closes [#158](https://github.com/valueadd-poland/pimp-my-pr/issues/158)
* **pmp:** login by bitbucket ([#162](https://github.com/valueadd-poland/pimp-my-pr/issues/162)) ([00dc87b](https://github.com/valueadd-poland/pimp-my-pr/commit/00dc87b51ff75146461e4f3991eb732a8e7a04b1))
* **pmp:** login by gitlab account ([f1e6703](https://github.com/valueadd-poland/pimp-my-pr/commit/f1e6703d6d88dc1b61f8d88d6fac0fc96e96d653)), closes [#197](https://github.com/valueadd-poland/pimp-my-pr/issues/197)
* **pmp:** logout on unauthorized request ([904c80a](https://github.com/valueadd-poland/pimp-my-pr/commit/904c80a9be928e1e67e51a4eec72f90a998206e1)), closes [#182](https://github.com/valueadd-poland/pimp-my-pr/issues/182)
* **pmp:** remove repository - backend ([b2f6468](https://github.com/valueadd-poland/pimp-my-pr/commit/b2f64688ae992eabc09db514e3aa8bc52262e77a)), closes [#181](https://github.com/valueadd-poland/pimp-my-pr/issues/181)
* **pmp:** remove repository - front ([fd9344c](https://github.com/valueadd-poland/pimp-my-pr/commit/fd9344c600b9e476bdd7b8dd694c5ddb360f5ae3)), closes [#181](https://github.com/valueadd-poland/pimp-my-pr/issues/181)
* **pmp-api:** add repository to the system ([1cb9b7f](https://github.com/valueadd-poland/pimp-my-pr/commit/1cb9b7f5e17ef000f262ea711df033d0a982f139)), closes [#118](https://github.com/valueadd-poland/pimp-my-pr/issues/118)
* **pmp-api:** adding 'max lines' and 'max waiting date' property ([db8ae97](https://github.com/valueadd-poland/pimp-my-pr/commit/db8ae97493f680e27e54d683689d1cb9b5fde463))
* **pmp-api:** fetch data from bitbucket ([96eb59f](https://github.com/valueadd-poland/pimp-my-pr/commit/96eb59fc28512e536e295039142ba1973cdab851)), closes [#7](https://github.com/valueadd-poland/pimp-my-pr/issues/7)
* **pmp-api:** repository list ([f4cf731](https://github.com/valueadd-poland/pimp-my-pr/commit/f4cf731082ec9843307516b1a1e0360ed59e8d15))
* **pmp-api:** swagger ([337e477](https://github.com/valueadd-poland/pimp-my-pr/commit/337e47752c180d81856df2e4a602495e31357f72))
* **pmp-web:** add core module ([1d72045](https://github.com/valueadd-poland/pimp-my-pr/commit/1d720450df99f68c14f7a354ad5d8cb54e5c7fd6))
* **pmp-web:** add repositery-settings view ([ace8b1b](https://github.com/valueadd-poland/pimp-my-pr/commit/ace8b1bc4693e4c18f1d3c358c25d3ba218bffc5))
* **pmp-web:** add repository data-access [#149](https://github.com/valueadd-poland/pimp-my-pr/issues/149) ([2f8216f](https://github.com/valueadd-poland/pimp-my-pr/commit/2f8216fe4af077c01b67c90122b710619fdd721c))
* **pmp-web:** add repository ui implementation ([#169](https://github.com/valueadd-poland/pimp-my-pr/issues/169)) ([e53f53f](https://github.com/valueadd-poland/pimp-my-pr/commit/e53f53f483ff640551c35568b304a186cfaa3f84)), closes [#106](https://github.com/valueadd-poland/pimp-my-pr/issues/106) [#108](https://github.com/valueadd-poland/pimp-my-pr/issues/108)
* **pmp-web:** enhance resolveHours, replace user for reviewer ([1ab3cc3](https://github.com/valueadd-poland/pimp-my-pr/commit/1ab3cc384edd2063fb809c72bf47602ae9177b26)), closes [#121](https://github.com/valueadd-poland/pimp-my-pr/issues/121) [#124](https://github.com/valueadd-poland/pimp-my-pr/issues/124)
* **pmp-web:** enhance resolveHours, replace user for reviewer ([5733ed9](https://github.com/valueadd-poland/pimp-my-pr/commit/5733ed9452d608fc9ddd9f79bab0725dc4d5db31)), closes [#121](https://github.com/valueadd-poland/pimp-my-pr/issues/121) [#124](https://github.com/valueadd-poland/pimp-my-pr/issues/124)


### Bug Fixes

* **pmp:** change fullName to Url in addRepo ([a7a5267](https://github.com/valueadd-poland/pimp-my-pr/commit/a7a5267115f0282387620105b73c3e06bf7afef7))
* **pmp:** load reviewer by id ([6f78d19](https://github.com/valueadd-poland/pimp-my-pr/commit/6f78d197ff92ba275bb3fcc726a08ad9111c2fac)), closes [#137](https://github.com/valueadd-poland/pimp-my-pr/issues/137)
* **pmp:** redirect on app refresh ([11e6ee1](https://github.com/valueadd-poland/pimp-my-pr/commit/11e6ee18ab9520a0ca6b982522ea7d97e2dfee6f)), closes [#189](https://github.com/valueadd-poland/pimp-my-pr/issues/189)
* **pmp-web:** add tooltips to the navigation bar items ([153b7f3](https://github.com/valueadd-poland/pimp-my-pr/commit/153b7f35a4ec9c6f4da515fb9c5f8adfd16d2d34)), closes [#178](https://github.com/valueadd-poland/pimp-my-pr/issues/178)
* **pmp-web:** blinking login page ([3248bc6](https://github.com/valueadd-poland/pimp-my-pr/commit/3248bc6097f85958f78f26f5cca45e05a35f845a))
* **pmp-web:** display proper maxWaitingTime ([7dea623](https://github.com/valueadd-poland/pimp-my-pr/commit/7dea6236b0d623400224c9e0b82f56b78e736f90))
* **pmp-web:** fix pages' height ([a2353ea](https://github.com/valueadd-poland/pimp-my-pr/commit/a2353eaa0df65844f0363d7bc44dd9aa9fe9da2e)), closes [#179](https://github.com/valueadd-poland/pimp-my-pr/issues/179)
* **pmp-web:** remove gray background from icons ([d49c57f](https://github.com/valueadd-poland/pimp-my-pr/commit/d49c57f6e3254b463bb3c09927405ff40e08c60c)), closes [#172](https://github.com/valueadd-poland/pimp-my-pr/issues/172)

## 1.0.0 (2020-03-16)


### Features

* **pmp:** add Angular Material ([e7dbca3](https://github.com/valueadd-poland/pimp-my-pr/commit/e7dbca3d011acf82afd2a921f3bce1b7aabd949e)), closes [#27](https://github.com/valueadd-poland/pimp-my-pr/issues/27)
* **pmp:** add favicon ([00f830d](https://github.com/valueadd-poland/pimp-my-pr/commit/00f830d261b2384519dc000b07d2d9aa9b8f159b)), closes [#13](https://github.com/valueadd-poland/pimp-my-pr/issues/13)
* **pmp:** add prettier to git add hook ([a0cec3b](https://github.com/valueadd-poland/pimp-my-pr/commit/a0cec3b2c517752a239368e212c08af260e88e4d))
* **pmp:** add sgc plugin for commit messages ([3d42196](https://github.com/valueadd-poland/pimp-my-pr/commit/3d42196c1bf3d21e002bfd84983b4769efeabd47)), closes [#4](https://github.com/valueadd-poland/pimp-my-pr/issues/4)
* **pmp:** add web app title in index.html ([75c8696](https://github.com/valueadd-poland/pimp-my-pr/commit/75c869686625bcec5f4b38b029c327eaac5e6425)), closes [#14](https://github.com/valueadd-poland/pimp-my-pr/issues/14)
* **pmp:** login page ([7d6c3ba](https://github.com/valueadd-poland/pimp-my-pr/commit/7d6c3bac8441acd01b7ba5ee4e2bd2d2c46dcca1)), closes [#30](https://github.com/valueadd-poland/pimp-my-pr/issues/30)
* **pmp:** remove repository prefix from reviewer endpoints ([8e86766](https://github.com/valueadd-poland/pimp-my-pr/commit/8e867667836ffc3dfe0d21605801fcaef768e41b))
* **pmp:** replace generic table with more specific one ([1a75eb7](https://github.com/valueadd-poland/pimp-my-pr/commit/1a75eb7219314cade2943f82f570a3a521106a70))
* **pmp:** setup application shell ([f9c98a1](https://github.com/valueadd-poland/pimp-my-pr/commit/f9c98a1f366840895a261c033bb73fd68cbc84ed)), closes [#36](https://github.com/valueadd-poland/pimp-my-pr/issues/36)
* **pmp:** setup Nx workspace ([3baefbb](https://github.com/valueadd-poland/pimp-my-pr/commit/3baefbb4e1b4ba57a04dcc44eda68531a8a5b903)), closes [#2](https://github.com/valueadd-poland/pimp-my-pr/issues/2)
* **pmp:** single user statistic shared model with backend ([c504129](https://github.com/valueadd-poland/pimp-my-pr/commit/c504129994bba4087ce6ca861dd4b83e24736d62))
* **pmp-api:** add endpoint for getting reviewers statistics ([3e80a3f](https://github.com/valueadd-poland/pimp-my-pr/commit/3e80a3f648f907692f2e84303c5b13af0e30c6ba)), closes [#17](https://github.com/valueadd-poland/pimp-my-pr/issues/17)
* **pmp-api:** add endpoint for statistics of the repositories ([f3ea04e](https://github.com/valueadd-poland/pimp-my-pr/commit/f3ea04ec55cce430da6a35dad5461a1516539b12)), closes [#45](https://github.com/valueadd-poland/pimp-my-pr/issues/45)
* **pmp-api:** add id to repository model ([507b59b](https://github.com/valueadd-poland/pimp-my-pr/commit/507b59b816ca166ddfe75d0cc7c97a9ee7fb6800))
* **pmp-api:** add marshal lib for auto mapping ([4eb66eb](https://github.com/valueadd-poland/pimp-my-pr/commit/4eb66ebc3d644e7303112d3ffe87644405036c23))
* **pmp-api:** add pmp-api-e2e application ([7b38a88](https://github.com/valueadd-poland/pimp-my-pr/commit/7b38a88104264a293a9002755952685a46288785)), closes [#40](https://github.com/valueadd-poland/pimp-my-pr/issues/40)
* **pmp-api:** add prStatisticsWithReviewers ([67a4386](https://github.com/valueadd-poland/pimp-my-pr/commit/67a43864b5c04432f0a6dcf942acffc3eb1a8f5c))
* **pmp-api:** endpoint for getting users statistics ([b092d32](https://github.com/valueadd-poland/pimp-my-pr/commit/b092d327a1c3babd38d95d5303a0a5999fcfec84)), closes [#17](https://github.com/valueadd-poland/pimp-my-pr/issues/17)
* **pmp-api:** get single repository ([8e51992](https://github.com/valueadd-poland/pimp-my-pr/commit/8e51992b348114f28d185f2b2de81e59bb881b24))
* **pmp-api:** get single reviewer statistics ([cd1b683](https://github.com/valueadd-poland/pimp-my-pr/commit/cd1b683a77d592432a20512eca4af430aede85c6)), closes [#70](https://github.com/valueadd-poland/pimp-my-pr/issues/70)
* **pmp-api:** read multiple repositories from config ([46d6a31](https://github.com/valueadd-poland/pimp-my-pr/commit/46d6a318f3f06495a98551921d95d63d65dedef7))
* **pmp-web:** add app routing module ([ed6b410](https://github.com/valueadd-poland/pimp-my-pr/commit/ed6b4108e3a573827a7e92f77c8e3e4ffb941f50))
* **pmp-web:** add basic pages styles ([3144045](https://github.com/valueadd-poland/pimp-my-pr/commit/3144045c863416a6c8798689add00d3f07cc2b96)), closes [#PMP-79](https://github.com/valueadd-poland/pimp-my-pr/issues/PMP-79)
* **pmp-web:** add data-access for repository statistics ([cb7d72e](https://github.com/valueadd-poland/pimp-my-pr/commit/cb7d72e6eda0e5838dd409e88989ded77e82cfde))
* **pmp-web:** add go back header to repository statistics ([cb8e8f1](https://github.com/valueadd-poland/pimp-my-pr/commit/cb8e8f1e8e1537f2a1171170d229e9e552d05bde))
* **pmp-web:** add loading indicators to all views ([42dba65](https://github.com/valueadd-poland/pimp-my-pr/commit/42dba6527518b3875833959df224b9c88ebccd8b)), closes [#96](https://github.com/valueadd-poland/pimp-my-pr/issues/96)
* **pmp-web:** add mat sorting at table pr statistics ([2c80539](https://github.com/valueadd-poland/pimp-my-pr/commit/2c805393c34d16d213f14c53a76cff39faf47f5c))
* **pmp-web:** add person bar ui lib ([a9716f1](https://github.com/valueadd-poland/pimp-my-pr/commit/a9716f11a763c2348d7fe288f2d0a6330230b275))
* **pmp-web:** add repository statistics ([49068da](https://github.com/valueadd-poland/pimp-my-pr/commit/49068da875d06acc5134fcedbc49c7b8db7fc7c0))
* **pmp-web:** add single repository statistics ([7356a9e](https://github.com/valueadd-poland/pimp-my-pr/commit/7356a9e88a3c501b9d33b129cffe1d8e14b471a2))
* **pmp-web:** add table pr statistics presenter ([62e9eb4](https://github.com/valueadd-poland/pimp-my-pr/commit/62e9eb44bc3a582caf0556efd93e76a611c7457b))
* **pmp-web:** basic routing for displaying user statistics ([b1dafcd](https://github.com/valueadd-poland/pimp-my-pr/commit/b1dafcd8d919711dbec7f0dc4ce74696f5311e66)), closes [#17](https://github.com/valueadd-poland/pimp-my-pr/issues/17)
* **pmp-web:** basic routing for repository users ([043bb8d](https://github.com/valueadd-poland/pimp-my-pr/commit/043bb8dfddedecae2a2ef1d4a35c1c37ff310118)), closes [#PMP-18](https://github.com/valueadd-poland/pimp-my-pr/issues/PMP-18)
* **pmp-web:** data-access-lib workspace schematics ([424b9c4](https://github.com/valueadd-poland/pimp-my-pr/commit/424b9c4b1224f20eaec2b59a9605cbda1029f408))
* **pmp-web:** display repositories statistics ([47bef99](https://github.com/valueadd-poland/pimp-my-pr/commit/47bef991e75086cebc83285aab1798d395625b9d))
* **pmp-web:** implement fetching data from api for single repository ([8ddf192](https://github.com/valueadd-poland/pimp-my-pr/commit/8ddf19220fc1239f3bb30f3f370e3129898b50cf))
* **pmp-web:** make table component more generic ([4e0834d](https://github.com/valueadd-poland/pimp-my-pr/commit/4e0834d776443f19bdcb5eefb7009fe46879c078)), closes [#67](https://github.com/valueadd-poland/pimp-my-pr/issues/67)
* **pmp-web:** revert table, single user statistics ui improvement ([fd7cbf2](https://github.com/valueadd-poland/pimp-my-pr/commit/fd7cbf2f72cc345b6846054ea66f458546384a33))
* **pmp-web:** shared navbar component ([394958d](https://github.com/valueadd-poland/pimp-my-pr/commit/394958d5c2b9ec5487283ce7dd33749345c1b291))
* **pmp-web:** shared sidebar component ([dd073fa](https://github.com/valueadd-poland/pimp-my-pr/commit/dd073fae605baafcf59411fe42f57b7a68810be7))
* **pmp-web:** shared table component ([2ee3eff](https://github.com/valueadd-poland/pimp-my-pr/commit/2ee3effef968614277e6b3a54e2c697b33000e6e))
* **pmp-web:** shell library for user domain ([c1930b0](https://github.com/valueadd-poland/pimp-my-pr/commit/c1930b039869df22756e893ea40544329c337dae))
* **pmp-web:** single user statistic data access ([0f6338d](https://github.com/valueadd-poland/pimp-my-pr/commit/0f6338d7ef9053b8e88424fcaf4088eab8e529f8))
* **pmp-web:** single user statistic feature init of library ([e879380](https://github.com/valueadd-poland/pimp-my-pr/commit/e8793800c241c97b5edfd341e091a1937bdc6869))
* **pmp-web:** single user statistics component init with mocked data ([12023d1](https://github.com/valueadd-poland/pimp-my-pr/commit/12023d176762394e266b45b75c6fd8c30215595d))
* **pmp-web:** single user statistics ui with mocked data ([320bc27](https://github.com/valueadd-poland/pimp-my-pr/commit/320bc2753e4916785dcc871d9b88428fb1881186))
* **pmp-web:** ui lib for picture-label element ([e5a65fd](https://github.com/valueadd-poland/pimp-my-pr/commit/e5a65fde7b318943781fdf70eafb97f732cb9475))
* **pmp-web:** users statistics feature ([877d15c](https://github.com/valueadd-poland/pimp-my-pr/commit/877d15c2f4b02cded18229391d05bd994528dc88)), closes [#18](https://github.com/valueadd-poland/pimp-my-pr/issues/18)
* **pmp-web-user:** create data-access lib with get collection ([451d632](https://github.com/valueadd-poland/pimp-my-pr/commit/451d632c4e9be9d5c8a6181e85b23cdffededc4d)), closes [#18](https://github.com/valueadd-poland/pimp-my-pr/issues/18)
* **pmp-web-user:** create data-access lib with get collection ([cb02136](https://github.com/valueadd-poland/pimp-my-pr/commit/cb021361ac44ce3f2a20b8812a27342b185e42c5)), closes [#18](https://github.com/valueadd-poland/pimp-my-pr/issues/18)
* **pmp-web-user:** create data-access lib with get collection ([b046231](https://github.com/valueadd-poland/pimp-my-pr/commit/b0462318c3b767514ddb8b50dba23e986f57ee84)), closes [#18](https://github.com/valueadd-poland/pimp-my-pr/issues/18)
* **pmp-web-user:** create domain lib for user scope ([0a4c2cc](https://github.com/valueadd-poland/pimp-my-pr/commit/0a4c2cc1aa787a1eba7447ec2736839aead48f6e)), closes [#18](https://github.com/valueadd-poland/pimp-my-pr/issues/18)


### Bug Fixes

* **pmp-api:** add missing reviewer property of pr stat read model ([b6ea5fb](https://github.com/valueadd-poland/pimp-my-pr/commit/b6ea5fb491b381a180441bfee1a2ee0a50e9a57e))
* **pmp-api:** get repository reviewers ([7dee2e9](https://github.com/valueadd-poland/pimp-my-pr/commit/7dee2e907e9c8ab940aa111e21ee6fe8fc2fd8e9)), closes [#17](https://github.com/valueadd-poland/pimp-my-pr/issues/17)
* **pmp-api:** get repository reviewers ([623467b](https://github.com/valueadd-poland/pimp-my-pr/commit/623467bedfb39dbbcb200c04bd0e006d80d763a0)), closes [#17](https://github.com/valueadd-poland/pimp-my-pr/issues/17)
* **pmp-api:** needed params for user statistics ([ed4962b](https://github.com/valueadd-poland/pimp-my-pr/commit/ed4962b97361a74aa6d3f5fcf94a173cde110019))
* **pmp-api:** remove index.ts from type grouping dirs ([40b9f02](https://github.com/valueadd-poland/pimp-my-pr/commit/40b9f028c5f6b4647a29dd45ea5358eef69685c8))
* **pmp-api:** single repo statistics return prs ([b110f8f](https://github.com/valueadd-poland/pimp-my-pr/commit/b110f8fb11e9cc483bbf2a305e8bf462625989da))
* **pmp-api:** sync env variables with docker-compose ([53c8a27](https://github.com/valueadd-poland/pimp-my-pr/commit/53c8a275007d192ce2470074583f04075d249674))
* **pmp-web:** add missing scope of repository's data access ([7111987](https://github.com/valueadd-poland/pimp-my-pr/commit/711198787836c6d1ee4ca902737b427730c8b416))
* **pmp-web:** change import to shorthand at repository domain ([3159ac2](https://github.com/valueadd-poland/pimp-my-pr/commit/3159ac2f213c14af3de2aa8284099cb8957145fe))
* **pmp-web:** change import to shorthand at single repository facade ([307607b](https://github.com/valueadd-poland/pimp-my-pr/commit/307607be225643d32cf92367f1f648022fdfe1ce))
* **pmp-web:** change routing param name to suitable one ([55a1386](https://github.com/valueadd-poland/pimp-my-pr/commit/55a13868cf8587b6fad1e413dd9d06fb1a4ac44f))
* **pmp-web:** fix error while trying get properties of null ([a73de94](https://github.com/valueadd-poland/pimp-my-pr/commit/a73de946215f87495e83355dfa7c5155bf833120))
* **pmp-web:** fix go back routing at repository ([1ebf8b4](https://github.com/valueadd-poland/pimp-my-pr/commit/1ebf8b473398d99be27f1018a9eea280c7e10f84))
* **pmp-web:** fix imports at shared domain after rebase ([5f62f6b](https://github.com/valueadd-poland/pimp-my-pr/commit/5f62f6b44043a97a94eeb5ceee9f41831b939299))
* **pmp-web:** fix redirect and single user ui ([21ba675](https://github.com/valueadd-poland/pimp-my-pr/commit/21ba675ba6bc70c667b9b98b8ec9987e6b930070)), closes [#17](https://github.com/valueadd-poland/pimp-my-pr/issues/17)
* **pmp-web:** fix single user stats repository picture ([460029a](https://github.com/valueadd-poland/pimp-my-pr/commit/460029a8fa4a7751595644006cf544ded3296166))
* **pmp-web:** fix unused export from index at shared/domain ([48aadae](https://github.com/valueadd-poland/pimp-my-pr/commit/48aadae6a617548a930020151e3d34c9609c48a4))
* **pmp-web:** remove not necessary tag in dom ([8e852a8](https://github.com/valueadd-poland/pimp-my-pr/commit/8e852a83d073daeb61f9cedabe1e83af85ad6c70))
* **pmp-web:** rename not declared nx tag ([c5dcf87](https://github.com/valueadd-poland/pimp-my-pr/commit/c5dcf87afca22d431ac05a35ccdb5e5f6cd285f3))
* **pmp-web:** uncomment needed code at implementation ([fcd730e](https://github.com/valueadd-poland/pimp-my-pr/commit/fcd730ea04531f3cac45d83c48254fcfa6f481a2))
* **pmp-web:** wrong import at list repositories after rebase changes ([a5ece9a](https://github.com/valueadd-poland/pimp-my-pr/commit/a5ece9a4b6e7aa59556ade8b3acfa9dd84af41cb))
