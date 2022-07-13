INSERT INTO `surveys`(`id`, `name`, `userId`)
VALUES(NULL, 'Test Survey', '1');
INSERT INTO `questions`(`id`, `question`, `type`, `surveyId`)
VALUES(
    NULL,
    'What color do you like?',
    'SINGLE_CHOICE',
    '1'
),(
    NULL,
    'Do you like this survey?',
    'BOOLEAN',
    '1'
),(
    NULL,
    'How much do you like this survey?',
    'SCALE',
    '1'
),(
    NULL,
    'Whats the Rating?',
    'SCALE',
    '1'
);
INSERT INTO `options`(`id`, `type`, `choice`, `questionId`)
VALUES(NULL, 'SINGLE_CHOICE', 'YELLOW', '1'),(NULL, 'SINGLE_CHOICE', 'BLUE', '1');
INSERT INTO `scales`(`id`, `min`, `max`, `questionId`)
VALUES(NULL, '1', '10', '3'),(NULL, '2', '5', '4')