import { _saveQuestion, _saveQuestionAnswer } from "./_DATA.js";

describe("Test _DATA", () => {
  it("saves question with correct format", async () => {
    const optionOneText = "optionOneText";
    const optionTwoText = "optionTwoText";
    const author = "author";
    const result = await _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("author", author);
    expect(result.timestamp).toBeDefined();
    expect(result).toHaveProperty("optionOne", {
      text: optionOneText,
      votes: [],
    });
    expect(result).toHaveProperty("optionTwo", {
      text: optionTwoText,
      votes: [],
    });
  });

  it("errors on missing data in _saveQuestion", async () => {
    const optionOneText = "optionOneText";
    const optionTwoText = "optionTwoText";
    const author = "author";

    const missingDataTests = [
      { data: { optionOneText, optionTwoText } },
      { data: { optionOneText, author } },
      { data: { optionTwoText, author } },
    ];

    for (const testData of missingDataTests) {
      await expect(_saveQuestion(testData.data)).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      );
    }
  });

  it("saves question answer with correct format", async () => {
    const authenticationUser = { id: "tylermcginnis" };
    const questionId = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await expect(
      _saveQuestionAnswer({ authenticationUser, questionId, answer })
    ).resolves.toBe(true);
  });

  it("errors on missing data in _saveQuestionAnswer", async () => {
    const authenticationUser = { id: "tylermcginnis" };
    const questionId = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    const missingDataTests = [
      { data: { authenticationUser, questionId } },
      { data: { authenticationUser, answer } },
      { data: { questionId, answer } },
    ];

    for (const testData of missingDataTests) {
      await expect(_saveQuestionAnswer(testData.data)).rejects.toEqual(
        "Please provide authenticationUser, questionId, and answer"
      );
    }
  });
});
