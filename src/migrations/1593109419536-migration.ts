import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1593109419536 implements MigrationInterface {
    name = 'migration1593109419536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tagging` (`tagId` int NOT NULL, `articleId` int NOT NULL, INDEX `IDX_9a33d6bc10f456687df9f8dbf7` (`tagId`), INDEX `IDX_05d524ce1bf62c40a22e8aaf5f` (`articleId`), PRIMARY KEY (`tagId`, `articleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `tagging` ADD CONSTRAINT `FK_9a33d6bc10f456687df9f8dbf73` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tagging` ADD CONSTRAINT `FK_05d524ce1bf62c40a22e8aaf5f0` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tagging` DROP FOREIGN KEY `FK_05d524ce1bf62c40a22e8aaf5f0`");
        await queryRunner.query("ALTER TABLE `tagging` DROP FOREIGN KEY `FK_9a33d6bc10f456687df9f8dbf73`");
        await queryRunner.query("DROP INDEX `IDX_05d524ce1bf62c40a22e8aaf5f` ON `tagging`");
        await queryRunner.query("DROP INDEX `IDX_9a33d6bc10f456687df9f8dbf7` ON `tagging`");
        await queryRunner.query("DROP TABLE `tagging`");
        await queryRunner.query("DROP TABLE `tag`");
    }

}
