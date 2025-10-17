const QAServices = require("./qaServices");

class ChatServices {
  static async handleVisitorMessage(data) {
    const { chatbot, message } = data;
    const match = await QAServices.searchBestMatch(chatbot, message);
    if (match) {
      return { type: "answer", answer: match.answer, matchQA: match._id };
    }
    // await VisitorRepo.create({ chatbot: chatbot, message });
    return {
      type: "fallback",
      answer:
        "Thanks for your message. Kindly submit this form and our executive will reach out as soon as possible.",
    };
  }

}

module.exports = ChatServices