-- Populate the hr groups  
INSERT INTO `hrforever`.`hr_groups` (`group_id`, `group_description`) VALUES ('1', 'Administrator');
INSERT INTO `hrforever`.`hr_groups` (`group_id`, `group_description`) VALUES ('2', 'Employee');
INSERT INTO `hrforever`.`hr_groups` (`group_id`, `group_description`) VALUES ('3', 'Client');
INSERT INTO `hrforever`.`hr_groups` (`group_id`, `group_description`) VALUES ('4', 'Guest');

-- Populate the users table (password hash in sha256: password)
INSERT INTO `hrforever`.`hr_users` (`id`, `username`, `email`, `password`, `group_id`, `creation_time`, `modification_time`) VALUES ('TestAdministrator', 'testadmin@test.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', '1');
INSERT INTO `hrforever`.`hr_users` (`id`, `username`, `email`, `password`, `group_id`, `creation_time`, `modification_time`) VALUES ('TestUser', 'testuser@test.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', '2');
INSERT INTO `hrforever`.`hr_users` (`id`, `username`, `email`, `password`, `group_id`, `creation_time`, `modification_time`) VALUES ('TestClient', 'testclient@test.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', '3');

