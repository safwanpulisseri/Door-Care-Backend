import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injections/adminInjection";
import { serviceAdapter } from "./injections/serviceInjection";
import AuthMiddleware from "../Middleware/authMiddleware";
import { bookingAdapter } from "./injections/bookingInjection";

const router = express.Router();

// route for admin login
router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  adminAdapter.loginAdmin(req, res, next)
);

// ============= User related routes ================= //

// route for get user data
router.get(
  "/getUsers",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getUsers(req, res, next)
);

// route for block user
router.patch(
  "/users/unblock-block",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.blockUnblockUser(req, res, next)
);

// ============= Service related routes ================= //

// route for create service
router.post(
  "/createService",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    serviceAdapter.createService(req, res, next)
);

// route for get all services
router.get("/getServices", (req: Request, res: Response, next: NextFunction) =>
  serviceAdapter.getService(req, res, next)
);

// route for edit all service details
router.put(
  "/editService",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    serviceAdapter.editService(req, res, next)
);

// ============= Worker related routes ================= //

// route for get all worker
router.get(
  "/getJoinRequests",
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.getJoinRequests(req, res, next)
);

// router for accept or reject worker
router.patch(
  "/worker/accept-rejectRequest",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.acceptOrRejectRequest(req, res, next)
);

// route for block or un block worker
router.patch(
  "/worker/unblock-block",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    adminAdapter.block_unBlockWorker(req, res, next)
);

// For get bookings
router.get(
  "/getBookings",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    bookingAdapter.getBookings(req, res, next)
);
router.post(
  "/getBookings",
  AuthMiddleware.protectAdmin,
  (req: Request, res: Response, next: NextFunction) =>
    bookingAdapter.getBookings(req, res, next)
);

// Route for user logout
router.post("/logout", (req: Request, res: Response, next: NextFunction) =>
  adminAdapter.logoutAdmin(req, res, next)
);

export default router;
