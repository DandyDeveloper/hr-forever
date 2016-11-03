--
-- Database : `hrForever`
--
CREATE DATABASE IF NOT EXISTS `hrForever`
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE hrForever;

-- --------------------------------------------------------

--
-- Privileges
--
-- (activate this statement if necessary)
GRANT SELECT, INSERT, DELETE, UPDATE, ALTER ON `hrForever`.* TO 'hradmin'@localhost;

-- --------------------------------------------------------
--
-- Table structure for table `hr_users'
--

CREATE TABLE IF NOT EXISTS `hr_users` (
  `id`                int(11) NOT NULL auto_increment,
  `username`          varchar(255) NOT NULL,
  `email`             varchar(255) NOT NULL,
  `password`          varchar(255) NOT NULL,
  `group_id`          int(2) NOT NULL DEFAULT '1', 
  `creation_time`     DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`), 
  FOREIGN KEY (group_id) REFERENCES hr_groups(group_id)
)
  COMMENT='Usernames table'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------
--
-- Table structure for table `hr_groups'
--

CREATE TABLE IF NOT EXISTS `hr_groups` (
  `group_id`          int(11) NOT NULL auto_increment,
  `group_description` varchar(255) NOT NULL,  
  `creation_time`     DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (`group_id`)
)
  COMMENT='Group for permission based access to different application locations'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------
--
-- Table structure for table clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `id`                int(5)  NOT NULL auto_increment,
  `client_name`       varchar(64) NOT NULL default 'client',
  `creation_time`     DATETIME DEFAULT CURRENT_TIMESTAMP,
  `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
)
  COMMENT='List of clients'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------
--
-- Table structure for table relationship between client and users
--

CREATE TABLE IF NOT EXISTS `user_client_relationship` (
  `hr_user_id`        int(11) NOT NULL, 
  `client_id`         INT(5) NOT NULL,
  `modification_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (`hr_user_id`, `client_id`),
  FOREIGN KEY  (`hr_user_id`) REFERENCES hr_users(id), 
  FOREIGN KEY  (`client_id`) REFERENCES clients(id)
)
  COMMENT='Relationship between client and user - Entry created per user'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `leave types`
--

CREATE TABLE IF NOT EXISTS `leave_types` (
  `type_id`             INT(2) NOT NULL default '1',
  `type_description`    VARCHAR(255),
  PRIMARY KEY  (`type_id`)
)
  COMMENT='Description of leave types for leave table'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `leave`
--

CREATE TABLE IF NOT EXISTS `leave` (
  `id`                int(10) NOT NULL auto_increment,
  `hr_user_id`        int(11) NOT NULL,
  `type_id`           int(2) NOT NULL DEFAULT '1',
  `leave_remaining`   int(2) NOT NULL DEFAULT '15', 
  `start_date`        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date`          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creation_time`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`),
  FOREIGN KEY (type_id) REFERENCES leave_types(type_id)
)
  COMMENT='Leave assignment for users'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE IF NOT EXISTS `reports` (
  `report_desc`                 varchar(255) default 'a report', 
  `report_id`                   BIGINT(20) NOT NULL, 
  `report_ownership_group`      int(2) NOT NULL default '1', 
  PRIMARY KEY (`report_id`),
  FOREIGN KEY (report_ownership_group) REFERENCES hr_groups(group_id) 
)
  COMMENT='Reports for organisation'
  DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

-- --------------------------------------------------------