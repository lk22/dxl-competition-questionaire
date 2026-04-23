
export interface QuizData {
  name: string;
  email?: string;
  phone?: string;
  challengeOneCompleted: boolean;
  challengeTwoCompleted: boolean;
  challengeThreeCompleted: boolean;
  dailyQuestionAnswered: boolean;
  dailyQuestionAnswer: string;
  completedParticipation: boolean;
  participationDate: string;
}

export type QuizDataWithoutPersonalInfo = Omit<QuizData, 'name' | 'email' | 'phone'>;
export type QuizDataWithoutPersonalInfoAndDailyQuestion = Omit<QuizDataWithoutPersonalInfo, 'dailyQuestionAnswer'>;
export type ChallengeOneCompleted = Pick<QuizData, 'challengeOneCompleted'>;
export type ChallengeTwoCompleted = Pick<QuizData, 'challengeTwoCompleted'>;
export type ChallengeThreeCompleted = Pick<QuizData, 'challengeThreeCompleted'>;

export type DailyQuestionAnswered = Pick<QuizData, 'dailyQuestionAnswered'>;
export type DailyQuestionAnswer = Pick<QuizData, 'dailyQuestionAnswer'>;