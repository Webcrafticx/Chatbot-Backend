const chatBotRepo = require('../repositories/chatBotRepo');
const slugify = require('../utils/slugify');

class chatBotServices {
    static validUrl(url) {
    if (!url) return true; 
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  static normalizeUrl(url) {
    if (!url) return "";
    if (!/^https?:\/\//i.test(url)) return `https://${url}`;
    return url;
  }
    static async createChatBot(data){
        const {ownerId, companyName, logoUrl, welcomeMessage, description, socialLinks} = data;
        const slug = slugify(companyName);
        const existing = await chatBotRepo.findBySlug(slug);
        if(existing) throw new Error('Chatbot already exists with this name');
         if (
      !this.validUrl(socialLinks.facebook) ||
      !this.validUrl(socialLinks.instagram) ||
      !this.validUrl(socialLinks.youtube)
    ) {
      throw new Error("Invalid URL in social links");
    }

    // ✅ Normalize URLs (optional, cleaner)
    const normalizedLinks = {
      facebook: this.normalizeUrl(socialLinks.facebook),
      instagram: this.normalizeUrl(socialLinks.instagram),
      youtube: this.normalizeUrl(socialLinks.youtube),
    };
        return await chatBotRepo.create({owner: ownerId, companyName, logoUrl, slug, welcomeMessage, description, socialLinks: normalizedLinks});
    }
    static async updateChatBot(id, data){
        return await chatBotRepo.update(id, data);
    }

    static async getBySlug(slug){
        return await chatBotRepo.findBySlug(slug);
    }

    static async listByOwner(ownerId){
        return await chatBotRepo.findByOwner(ownerId);
    }
}

module.exports = chatBotServices