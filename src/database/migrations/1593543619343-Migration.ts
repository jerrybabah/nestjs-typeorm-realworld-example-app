import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1593543619343 implements MigrationInterface {
    name = 'Migration1593543619343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `body` varchar(255) NOT NULL, `createdAt` timestamp NOT NULL, `updatedAt` timestamp NOT NULL, `authorId` int NULL, `articleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `bio` text NULL, `image` varchar(255) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tag` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, UNIQUE INDEX `IDX_6a9775008add570dc3e5a0bab7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `article` (`id` int NOT NULL AUTO_INCREMENT, `slug` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `body` text NOT NULL, `createdAt` timestamp NOT NULL, `updatedAt` timestamp NOT NULL, `authorId` int NULL, UNIQUE INDEX `IDX_0ab85f4be07b22d79906671d72` (`slug`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `favorite` (`userId` int NOT NULL, `articleId` int NOT NULL, INDEX `IDX_83b775fdebbe24c29b2b5831f2` (`userId`), INDEX `IDX_c0d2a3aa86fa8415db7349ede2` (`articleId`), PRIMARY KEY (`userId`, `articleId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `follow` (`followId` int NOT NULL, `followedId` int NOT NULL, INDEX `IDX_17ddf2c0f751002248329ef04a` (`followId`), INDEX `IDX_f4a9d59861c87ba252ead40d84` (`followedId`), PRIMARY KEY (`followId`, `followedId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tagging` (`articleId` int NOT NULL, `tagId` int NOT NULL, INDEX `IDX_05d524ce1bf62c40a22e8aaf5f` (`articleId`), INDEX `IDX_9a33d6bc10f456687df9f8dbf7` (`tagId`), PRIMARY KEY (`articleId`, `tagId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c20404221e5c125a581a0d90c0e` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_a9c5f4ec6cceb1604b4a3c84c87` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_c0d2a3aa86fa8415db7349ede26` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `follow` ADD CONSTRAINT `FK_17ddf2c0f751002248329ef04ab` FOREIGN KEY (`followId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `follow` ADD CONSTRAINT `FK_f4a9d59861c87ba252ead40d84d` FOREIGN KEY (`followedId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tagging` ADD CONSTRAINT `FK_05d524ce1bf62c40a22e8aaf5f0` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tagging` ADD CONSTRAINT `FK_9a33d6bc10f456687df9f8dbf73` FOREIGN KEY (`tagId`) REFERENCES `tag`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tagging` DROP FOREIGN KEY `FK_9a33d6bc10f456687df9f8dbf73`");
        await queryRunner.query("ALTER TABLE `tagging` DROP FOREIGN KEY `FK_05d524ce1bf62c40a22e8aaf5f0`");
        await queryRunner.query("ALTER TABLE `follow` DROP FOREIGN KEY `FK_f4a9d59861c87ba252ead40d84d`");
        await queryRunner.query("ALTER TABLE `follow` DROP FOREIGN KEY `FK_17ddf2c0f751002248329ef04ab`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_c0d2a3aa86fa8415db7349ede26`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_83b775fdebbe24c29b2b5831f2d`");
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_a9c5f4ec6cceb1604b4a3c84c87`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c20404221e5c125a581a0d90c0e`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("DROP INDEX `IDX_9a33d6bc10f456687df9f8dbf7` ON `tagging`");
        await queryRunner.query("DROP INDEX `IDX_05d524ce1bf62c40a22e8aaf5f` ON `tagging`");
        await queryRunner.query("DROP TABLE `tagging`");
        await queryRunner.query("DROP INDEX `IDX_f4a9d59861c87ba252ead40d84` ON `follow`");
        await queryRunner.query("DROP INDEX `IDX_17ddf2c0f751002248329ef04a` ON `follow`");
        await queryRunner.query("DROP TABLE `follow`");
        await queryRunner.query("DROP INDEX `IDX_c0d2a3aa86fa8415db7349ede2` ON `favorite`");
        await queryRunner.query("DROP INDEX `IDX_83b775fdebbe24c29b2b5831f2` ON `favorite`");
        await queryRunner.query("DROP TABLE `favorite`");
        await queryRunner.query("DROP INDEX `IDX_0ab85f4be07b22d79906671d72` ON `article`");
        await queryRunner.query("DROP TABLE `article`");
        await queryRunner.query("DROP INDEX `IDX_6a9775008add570dc3e5a0bab7` ON `tag`");
        await queryRunner.query("DROP TABLE `tag`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `comment`");
    }

}
