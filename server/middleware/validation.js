import { body, param, query, validationResult } from "express-validator";

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("department")
    .isIn([
      "Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Information Technology",
      "Design",
      "Business",
      "Psychology",
      "Environmental Engineering",
      "Digital Media",
      "Data Science",
      "Other",
    ])
    .withMessage("Please select a valid department"),
  body("year")
    .isIn(["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"])
    .withMessage("Please select a valid year"),
  handleValidationErrors,
];

const validateUserLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

const validateUserUpdate = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
  body("skills").optional().isArray().withMessage("Skills must be an array"),
  body("interests")
    .optional()
    .isArray()
    .withMessage("Interests must be an array"),
  handleValidationErrors,
];

// Project validation rules
const validateProjectCreation = [
  body("title")
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),
  body("description")
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),
  body("category")
    .isIn([
      "AI/ML",
      "Web Development",
      "Mobile App",
      "IoT",
      "Game Development",
      "Data Science",
      "Blockchain",
      "Other",
    ])
    .withMessage("Please select a valid category"),
  body("skillsNeeded")
    .isArray({ min: 1 })
    .withMessage("At least one skill needed is required"),
  body("skillsOffered")
    .isArray({ min: 1 })
    .withMessage("At least one skill offered is required"),
  body("teamSize")
    .isIn(["2-3 people", "3-4 people", "4-5 people", "5+ people"])
    .withMessage("Please select a valid team size"),
  body("duration")
    .isIn(["1-2 months", "3-4 months", "5-6 months", "6+ months"])
    .withMessage("Please select a valid duration"),
  body("location")
    .isIn(["Remote", "On-campus", "Hybrid", "Flexible"])
    .withMessage("Please select a valid location"),
  handleValidationErrors,
];

const validateProjectUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage("Title must be between 5 and 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage("Description must be between 20 and 2000 characters"),
  body("status")
    .optional()
    .isIn(["active", "in-progress", "completed", "cancelled"])
    .withMessage("Please select a valid status"),
  handleValidationErrors,
];

// Application validation rules
const validateApplication = [
  body("message")
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
  body("skills").optional().isArray().withMessage("Skills must be an array"),
  body("availability.hoursPerWeek")
    .optional()
    .isInt({ min: 1, max: 40 })
    .withMessage("Hours per week must be between 1 and 40"),
  handleValidationErrors,
];

// Parameter validation
const validateObjectId = (paramName) => [
  param(paramName).isMongoId().withMessage(`Invalid ${paramName} ID`),
  handleValidationErrors,
];

// Query validation
const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  handleValidationErrors,
];

const validateProjectFilters = [
  query("category")
    .optional()
    .isIn([
      "AI/ML",
      "Web Development",
      "Mobile App",
      "IoT",
      "Game Development",
      "Data Science",
      "Blockchain",
      "Other",
    ])
    .withMessage("Invalid category"),
  query("location")
    .optional()
    .isIn(["Remote", "On-campus", "Hybrid", "Flexible"])
    .withMessage("Invalid location"),
  query("status")
    .optional()
    .isIn(["active", "in-progress", "completed", "cancelled"])
    .withMessage("Invalid status"),
  validatePagination,
];

export {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateProjectCreation,
  validateProjectUpdate,
  validateApplication,
  validateObjectId,
  validatePagination,
  validateProjectFilters,
  handleValidationErrors,
};
