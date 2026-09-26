import { Session } from "../models/session.model.js";

class SessionRepository {
    async create(sessionData) {
        return Session.create(sessionData);
    }


    async findById(sessionId) {
        return Session.findById(sessionId).select("+refreshToken").lean();
    }

    async findByNonPassId(sessionId) {
        return Session.findById(sessionId).lean();
    }

    async findActiveByUserId(userId) {
        return Session.find({ userId, revokedAt: null, }).lean();
    }

    async touchLastActivity(sessionId) {
        return Session.findByIdAndUpdate(sessionId, { lastActivityAt: new Date(), });
    }

    async updateRefreshToken({ sessionId, refreshTokenHash, jti, expiresAt }) {
        return Session.findByIdAndUpdate(sessionId,
            { refreshTokenHash, jti, expiresAt, lastActivityAt: new Date(), }, {
            new: true,
        }
        );
    }

    async revoke(sessionId) {
        return Session.findByIdAndUpdate(sessionId, { revokedAt: new Date() });
    }

    async revokeAllByUserId(userId, reason) {
        return Session.updateMany({ userId, revokedAt: null, },
            { revokedAt: new Date(), revokeReason: reason }
        );
    }

    async deleteExpired() {
        return Session.deleteMany({ expiresAt: { $lt: new Date() } });
    }
}

export const sessionRepository = new SessionRepository();