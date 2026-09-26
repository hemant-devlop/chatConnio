import mongoose from "mongoose";
import { cookieServie } from "../lib/cookie/cookie.service.js";
import { jwtService } from "../lib/jwt/jwt.service.js";
import { passwordService } from "../lib/password/password.service.js";
import { hashService } from "../lib/utils/hash.service.js";
import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";
import { sessionRepository } from "../repositories/session.repository.js";
import { userRepository } from "../repositories/user.repository.js";

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token required",
            });
        }

        // Verify token FIRST
        const decoded = jwtService.verifyRefreshToken(refreshToken);

        // Then validate token type
        if (decoded.type !== "refresh") {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        // Find user
        const user = await userRepository.findById(decoded.sub);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        // Find session
        const session = await sessionRepository.findById(decoded.sid);

        if (
            !session ||
            session.revokedAt ||
            session.expiresAt < new Date()
        ) {
            return res.status(401).json({
                success: false,
                message: "Unauthenticated",
            });
        }

        // Generate new access token
        const newAccessToken =
            jwtService.generateAccessToken({
                userId: decoded.sub,
                role: user.role,
                sessionId: decoded.sid,
            });

        // Generate new refresh token
        const newRefreshToken =
            jwtService.generateRefreshToken({
                userId: decoded.sub,
                sessionId: decoded.sid,
            });
        const refreshTokenHash = hashService.hashSha256(newRefreshToken);
        const decode = jwtService.decodeToken(newRefreshToken);

        const updateRefresh = await sessionRepository.updateRefreshToken({
            sessionId: decode.sid,
            jti: decode.jti,
            userId: decode.sub,
            refreshTokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })
        console.log(updateRefresh)
        // Set rotated refresh token
        cookieServie.setRefresehToken(
            res,
            newRefreshToken
        );

        return res.status(200).json({
            success: true,
            data: {
                accessToken: newAccessToken,
            },
        });

    } catch (error) {

        console.error("REFRESH ERROR:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'email password required'
            })
        }
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'invalid email/password'
            })
        }

        const passwordMatch = await passwordService.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'invalid email/password'
            })
        }

        const sessionId = new mongoose.Types.ObjectId()

        const refreshToken = jwtService.generateRefreshToken({ userId: user._id.toString(), sessionId })
        const decode = jwtService.decodeToken(refreshToken);
        const refreshTokenHash = hashService.hashSha256(refreshToken);
        const session = await Session.create({
            _id: sessionId,
            jti: decode.jti,
            userId: user._id,
            refreshTokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        const accessToken = jwtService.generateAccessToken({ userId: user._id.toString(), sessionId, role: user.role })

        cookieServie.setRefresehToken(res, refreshToken);

        return res.status(200).json({
            success: true,
            data: {
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                sessionId: session._id,
            }
        })
    } catch (error) {
        console.error("login error:", error)

        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!email || !password || !name || !username) {
            return res.status(401).json({
                success: false,
                message: 'all field required'
            })
        }
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        if (user) {
            return res.status(401).json({
                success: false,
                message: 'user already exist'
            })
        }

        const hashPassword = await passwordService.hash(password);

        const newUser = await User.create({
            name,
            username,
            email: email.toLowerCase(),
            password: hashPassword
        })

        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            }
        })
    } catch (error) {
        console.error("signup error:", error)

        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}
export const logout = async (req, res) => {
    try {
        const { _id } = req.session;

        const session = await sessionRepository.revoke(_id)
        return res.status(200).json({
            success: true,
            data: null
        })
    } catch (error) {
        console.error("Logout Error", error)

        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}