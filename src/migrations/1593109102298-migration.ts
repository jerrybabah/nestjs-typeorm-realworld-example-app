import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1593109102298 implements MigrationInterface {
    name = 'migration1593109102298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `follow` (`followId` int NOT NULL, `followedId` int NOT NULL, INDEX `IDX_17ddf2c0f751002248329ef04a` (`followId`), INDEX `IDX_f4a9d59861c87ba252ead40d84` (`followedId`), PRIMARY KEY (`followId`, `followedId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `follow` ADD CONSTRAINT `FK_17ddf2c0f751002248329ef04ab` FOREIGN KEY (`followId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `follow` ADD CONSTRAINT `FK_f4a9d59861c87ba252ead40d84d` FOREIGN KEY (`followedId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `follow` DROP FOREIGN KEY `FK_f4a9d59861c87ba252ead40d84d`");
        await queryRunner.query("ALTER TABLE `follow` DROP FOREIGN KEY `FK_17ddf2c0f751002248329ef04ab`");
        await queryRunner.query("DROP INDEX `IDX_f4a9d59861c87ba252ead40d84` ON `follow`");
        await queryRunner.query("DROP INDEX `IDX_17ddf2c0f751002248329ef04a` ON `follow`");
        await queryRunner.query("DROP TABLE `follow`");
    }

}
