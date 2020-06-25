import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1593108791245 implements MigrationInterface {
    name = 'migration1593108791245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `body` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, `updatedAt` datetime NOT NULL, `authorId` int NULL, `articleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `bio` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `article` (`id` int NOT NULL AUTO_INCREMENT, `slug` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `body` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, `updatedAt` datetime NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `favorite` (`userId` int NOT NULL, `articleId` int NOT NULL, INDEX `IDX_83b775fdebbe24c29b2b5831f2` (`userId`), INDEX `IDX_c0d2a3aa86fa8415db7349ede2` (`articleId`), PRIMARY KEY (`userId`, `articleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_276779da446413a0d79598d4fbd` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c20404221e5c125a581a0d90c0e` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `article` ADD CONSTRAINT `FK_a9c5f4ec6cceb1604b4a3c84c87` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_c0d2a3aa86fa8415db7349ede26` FOREIGN KEY (`articleId`) REFERENCES `article`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_c0d2a3aa86fa8415db7349ede26`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_83b775fdebbe24c29b2b5831f2d`");
        await queryRunner.query("ALTER TABLE `article` DROP FOREIGN KEY `FK_a9c5f4ec6cceb1604b4a3c84c87`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c20404221e5c125a581a0d90c0e`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_276779da446413a0d79598d4fbd`");
        await queryRunner.query("DROP INDEX `IDX_c0d2a3aa86fa8415db7349ede2` ON `favorite`");
        await queryRunner.query("DROP INDEX `IDX_83b775fdebbe24c29b2b5831f2` ON `favorite`");
        await queryRunner.query("DROP TABLE `favorite`");
        await queryRunner.query("DROP TABLE `article`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `comment`");
    }

}
