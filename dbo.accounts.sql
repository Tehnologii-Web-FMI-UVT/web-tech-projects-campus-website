CREATE TABLE [dbo].[accounts] (
    [id]                  INT            IDENTITY (1, 1) NOT NULL,
    [firstname]           VARCHAR (100)  NOT NULL,
    [lastname]            VARCHAR (100)  NOT NULL,
    [email]               VARCHAR (100)  NOT NULL,
    [userPassword]        VARBINARY (64) NOT NULL,
    [userConfirmPassword] VARBINARY (64) NOT NULL,
    PRIMARY KEY CLUSTERED ([id] ASC),
    UNIQUE NONCLUSTERED ([email] ASC)
);

