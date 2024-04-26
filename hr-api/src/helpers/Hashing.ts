import bcrypt from 'bcrypt';

const saltRounds = 10;

interface IHashPasswordParams {
  password: string;
}

interface IComparePasswordHash {
  passwordFormClient: string;
  passwordFromDatabase: string;
}

export const HashPassword = async ({ password }: IHashPasswordParams) => {
  return await bcrypt.hash(password, saltRounds);
};

export const ComparePassword = async ({
  passwordFormClient,
  passwordFromDatabase,
}: IComparePasswordHash) => {
  return await bcrypt.compare(passwordFormClient, passwordFromDatabase);
};
