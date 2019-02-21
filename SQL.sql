DROP TABLE IF EXISTS `url`;
DROP TABLE IF EXISTS `usuario`;
DROP TABLE IF EXISTS `arquivo`;
DROP TABLE IF EXISTS `banner`;
DROP TABLE IF EXISTS `configuracao`;
DROP TABLE IF EXISTS `hierarquia`;
DROP TABLE IF EXISTS `hierarquia_relaciona_permissao`;
DROP TABLE IF EXISTS `modulo`;
DROP TABLE IF EXISTS `ordem_usuario_menu`;
DROP TABLE IF EXISTS `pagina_institucional`;
DROP TABLE IF EXISTS `permissao`;
DROP TABLE IF EXISTS `pessoa`;
DROP TABLE IF EXISTS `plataforma`;
DROP TABLE IF EXISTS `plataforma_pagina`;
DROP TABLE IF EXISTS `submenu`;
CREATE TABLE `url`( `id` int(11) NOT NULL AUTO_INCREMENT, `url` varchar(512) NOT NULL, `id_controller` int(11) DEFAULT NULL, `controller` varchar(256) NOT NULL, `metodo` varchar(256) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `usuario`( `id` int(11) NOT NULL AUTO_INCREMENT, `email` varchar(256) NOT NULL, `senha` varchar(64) NOT NULL, `hierarquia` int(11) DEFAULT NULL, `super_admin` tinyint(1) NOT NULL DEFAULT '0', `oculto` tinyint(4) NOT NULL DEFAULT '0', `bloqueado` tinyint(4) NOT NULL DEFAULT '0', `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `hierarquia` (`hierarquia`), CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`hierarquia`) REFERENCES `hierarquia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8;
CREATE TABLE `arquivo`( `id` int(11) NOT NULL AUTO_INCREMENT, `hash` varchar(32) NOT NULL, `nome` varchar(128) NOT NULL, `endereco` varchar(256) NOT NULL, `tamanho` decimal(10,0) NOT NULL, `extensao` varchar(16) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `banner`( `id` int(11) NOT NULL AUTO_INCREMENT, `ordem` int(11) NOT NULL, `id_arquivo` int(11) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_arquivo` (`id_arquivo`), CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`id_arquivo`) REFERENCES `arquivo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `configuracao`( `id` int(11) NOT NULL AUTO_INCREMENT, `aplicacao_nome` varchar(32) DEFAULT NULL, `email` varchar(256) DEFAULT NULL, `id_google_analytics` varchar(128) DEFAULT NULL, `texto_direito_rodape` text, `texto_esquerdo_rodape` text, `cor_padrao` varchar(64) DEFAULT NULL, `politica_aprovacao` tinyint(1) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE `hierarquia`( `id` int(11) NOT NULL AUTO_INCREMENT, `nome` varchar(64) NOT NULL, `nivel` int(11) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE `hierarquia_relaciona_permissao`( `id` int(11) NOT NULL AUTO_INCREMENT, `id_hierarquia` int(11) NOT NULL, `id_permissao` int(11) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_hierarquia` (`id_hierarquia`), KEY `id_permissao` (`id_permissao`), CONSTRAINT `hierarquia_relaciona_permissao_ibfk_1` FOREIGN KEY (`id_hierarquia`) REFERENCES `hierarquia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `hierarquia_relaciona_permissao_ibfk_2` FOREIGN KEY (`id_permissao`) REFERENCES `permissao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB AUTO_INCREMENT=631 DEFAULT CHARSET=utf8;
CREATE TABLE `modulo`( `id` int(11) NOT NULL AUTO_INCREMENT, `modulo` varchar(64) NOT NULL, `nome` varchar(64) NOT NULL, `id_submenu` int(11) DEFAULT NULL, `hierarquia` int(11) NOT NULL, `icone` varchar(64) NOT NULL DEFAULT 'fa-angle-right', `oculto` tinyint(1) NOT NULL DEFAULT '0', `ordem` int(11) NOT NULL DEFAULT '1000', `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_submenu` (`id_submenu`)) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
CREATE TABLE `ordem_usuario_menu`( `id` int(11) NOT NULL AUTO_INCREMENT, `id_usuario` int(11) NOT NULL, `id_modulo` int(11) NOT NULL, `ordem` int(11) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_usuario` (`id_usuario`), KEY `id_modulo` (`id_modulo`), CONSTRAINT `ordem_usuario_menu_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `ordem_usuario_menu_ibfk_2` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `pagina_institucional`( `id` int(11) NOT NULL AUTO_INCREMENT, `titulo` varchar(512) DEFAULT NULL, `conteudo` text NOT NULL, `exibir_cabecalho` tinyint(1) NOT NULL DEFAULT '0', `exibir_rodape` tinyint(1) NOT NULL DEFAULT '0', `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `permissao`( `id` int(11) NOT NULL AUTO_INCREMENT, `id_modulo` int(11) NOT NULL, `permissao` varchar(64) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_modulo` (`id_modulo`)) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
CREATE TABLE `pessoa`( `id` int(11) NOT NULL AUTO_INCREMENT, `id_usuario` int(11) NOT NULL, `pronome` varchar(64) DEFAULT NULL, `nome` varchar(64) NOT NULL, `sobrenome` varchar(256) NOT NULL, `link` text, `instituicao` varchar(512) DEFAULT NULL, `orientador` tinyint(1) NOT NULL DEFAULT '0', `autor` tinyint(1) NOT NULL DEFAULT '0', `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_usuario` (`id_usuario`), CONSTRAINT `pessoa_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
CREATE TABLE `plataforma`( `id` int(11) NOT NULL AUTO_INCREMENT, `identificador` varchar(512) NOT NULL, `nome` varchar(512) NOT NULL, `descricao` varchar(1024) NOT NULL, `ultima_atualizacao` datetime DEFAULT NULL, `ultima_publicacao` datetime DEFAULT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `plataforma_pagina`( `id` int(11) NOT NULL AUTO_INCREMENT, `id_plataforma` int(11) NOT NULL, `id_usuario` int(11) NOT NULL, `html` text, `ultima_atualizacao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `publicado` tinyint(1) NOT NULL, `ativo` tinyint(1) NOT NULL DEFAULT '1', PRIMARY KEY (`id`), KEY `id_plataforma` (`id_plataforma`), KEY `id_usuario` (`id_usuario`), CONSTRAINT `plataforma_pagina_ibfk_1` FOREIGN KEY (`id_plataforma`) REFERENCES `plataforma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `plataforma_pagina_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `submenu`( `id` int(11) NOT NULL AUTO_INCREMENT, `nome` varchar(64) NOT NULL, `icone` varchar(64) NOT NULL DEFAULT 'fa-angle-right', `ativo` tinyint(1) NOT NULL DEFAULT '1', `nome_exibicao` varchar(64) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
INSERT INTO `configuracao` VALUES (1,'FelideoMVC ','','','','','',1,1);
INSERT INTO `hierarquia` VALUES (1,'Administrador',5,1);
INSERT INTO `hierarquia_relaciona_permissao` VALUES (1,1,5,0),(2,1,5,0),(3,1,6,0),(4,1,7,0),(5,1,8,0),(6,1,9,0),(7,1,10,0),(8,1,11,0),(9,1,12,0),(10,1,17,0),(11,1,18,0),(12,1,19,0),(13,1,20,0),(14,1,21,0),(15,1,22,0),(16,1,23,0),(17,1,24,0),(18,1,25,0),(19,1,26,0),(20,1,27,0),(21,1,28,0),(22,1,29,0),(23,1,30,0),(24,1,31,0),(25,1,32,0),(26,1,37,0),(27,1,38,0),(28,1,39,0),(29,1,40,0),(30,1,58,0),(31,1,59,0),(32,1,45,0),(33,1,46,0),(34,1,47,0),(35,1,48,0),(36,1,49,0),(37,1,50,0),(38,1,51,0),(39,1,52,0),(40,1,53,0),(41,1,54,0),(42,1,55,0),(43,1,56,0),(44,1,5,0),(45,1,6,0),(46,1,7,0),(47,1,21,0),(48,1,22,0),(49,1,23,0),(50,1,24,0),(51,1,29,0),(52,1,30,0),(53,1,31,0),(54,1,32,0),(55,1,37,0),(56,1,38,0),(57,1,39,0),(58,1,40,0),(59,1,58,0),(60,1,59,0),(61,1,45,0),(62,1,46,0),(63,1,47,0),(64,1,48,0),(65,1,49,0),(66,1,50,0),(67,1,51,0),(68,1,52,0),(69,1,53,0),(70,1,54,0),(71,1,55,0),(72,1,56,0),(107,1,5,0),(108,1,6,0),(109,1,7,0),(110,1,8,0),(111,1,21,0),(112,1,22,0),(113,1,23,0),(114,1,24,0),(115,1,29,0),(116,1,30,0),(117,1,31,0),(118,1,32,0),(119,1,37,0),(120,1,38,0),(121,1,39,0),(122,1,40,0),(123,1,58,0),(124,1,59,0),(125,1,45,0),(126,1,46,0),(127,1,47,0),(128,1,48,0),(129,1,49,0),(130,1,50,0),(131,1,51,0),(132,1,52,0),(133,1,53,0),(134,1,54,0),(135,1,55,0),(136,1,56,0),(355,1,60,0),(356,1,61,0),(357,1,62,0),(358,1,63,0),(359,1,5,0),(360,1,6,0),(361,1,7,0),(362,1,8,0),(363,1,9,0),(364,1,10,0),(365,1,11,0),(366,1,12,0),(367,1,21,0),(368,1,22,0),(369,1,23,0),(370,1,24,0),(371,1,25,0),(372,1,26,0),(373,1,27,0),(374,1,29,0),(375,1,30,0),(376,1,31,0),(377,1,32,0),(378,1,37,0),(379,1,38,0),(380,1,39,0),(381,1,40,0),(382,1,58,0),(383,1,59,0),(384,1,45,0),(385,1,46,0),(386,1,47,0),(387,1,48,0),(388,1,49,0),(389,1,50,0),(390,1,51,0),(391,1,52,0),(392,1,53,0),(393,1,54,0),(394,1,55,0),(395,1,56,0),(396,1,60,0),(397,1,61,0),(398,1,62,0),(399,1,63,0),(414,1,66,0),(415,1,67,0),(416,1,68,0),(417,1,69,0),(497,1,5,1),(498,1,6,1),(499,1,7,1),(500,1,65,1),(501,1,10,1),(502,1,11,1),(503,1,21,1),(504,1,22,1),(505,1,23,1),(506,1,24,1),(507,1,25,1),(508,1,26,1),(509,1,27,1),(510,1,29,1),(511,1,30,1),(512,1,31,1),(513,1,32,1),(514,1,37,1),(515,1,38,1),(516,1,39,1),(517,1,40,1),(518,1,58,1),(519,1,59,1),(520,1,45,1),(521,1,46,1),(522,1,47,1),(523,1,48,1),(524,1,49,1),(525,1,50,1),(526,1,51,1),(527,1,52,1),(528,1,53,1),(529,1,54,1),(530,1,55,1),(531,1,56,1),(532,1,60,1),(533,1,61,1),(534,1,62,1),(535,1,63,1);
INSERT INTO `modulo` VALUES (1,'modulo','Modulos',1,0,'fa-check-square-o',0,13000,1),(2,'usuario','Usuarios',NULL,1,'fa-users',0,1000,1),(3,'configuracao','Configurações',NULL,1,'fa-cog',0,10000,1),(4,'submenu','Submenus',1,0,'fa-sitemap',0,15000,1),(5,'hierarquia','Hierarquias',NULL,1,'fa-sitemap',0,9000,1),(6,'pagina_institucional','Pagina Institucional',NULL,1,'fa-file-code-o',0,8000,1),(7,'permissao','Permissões',1,0,'fa-thumbs-o-up',0,14000,1),(8,'banner','Banner',NULL,1,'fa-flag',0,9500,1),(9,'plataforma','HTML Cloud Editor',0,1,'fa-code',0,11000,1);
INSERT INTO `permissao` VALUES (1,1,'criar',1),(2,1,'visualizar',1),(3,1,'editar',1),(4,1,'deletar',1),(5,2,'criar',1),(6,2,'visualizar',1),(7,2,'editar',1),(8,2,'deletar',1),(9,3,'criar',0),(10,3,'visualizar',1),(11,3,'editar',1),(12,3,'deletar',0),(13,4,'criar',1),(14,4,'visualizar',1),(15,4,'editar',1),(16,4,'deletar',1),(17,5,'criar',1),(18,5,'visualizar',1),(19,5,'editar',1),(20,5,'deletar',1),(21,6,'criar',1),(22,6,'visualizar',1),(23,6,'editar',1),(24,6,'deletar',1),(25,7,'criar',1),(26,7,'visualizar',1),(27,7,'editar',1),(28,7,'deletar',1),(29,8,'criar',1),(30,8,'visualizar',1),(31,8,'editar',1),(32,8,'deletar',1),(33,9,'criar',1),(34,9,'visualizar',1),(35,9,'editar',1),(36,9,'deletar',1),(37,10,'criar',1),(38,10,'visualizar',1),(39,10,'editar',1),(40,10,'deletar',1),(41,11,'criar',1),(42,11,'visualizar',1),(43,11,'editar',1),(44,11,'deletar',1),(45,12,'criar',1),(46,12,'visualizar',1),(47,12,'editar',1),(48,12,'deletar',1),(49,13,'criar',1),(50,13,'visualizar',1),(51,13,'editar',1),(52,13,'deletar',1),(53,14,'criar',1),(54,14,'visualizar',1),(55,14,'editar',1),(56,14,'deletar',1),(58,10,'aprovar',1),(59,10,'reprovar',1),(60,15,'criar',1),(61,15,'visualizar',1),(62,15,'editar',1),(63,15,'deletar',1),(65,2,'remover_conceder_acesso',1),(66,17,'criar',0),(67,17,'visualizar',1),(68,17,'editar',1),(69,17,'deletar',0);
INSERT INTO `submenu` VALUES (1,'desenvolvedor','fa-github',1,'Desenvolvedor');
