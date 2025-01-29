// jest.setup.js
import "@testing-library/jest-dom"; // Add jest-dom matchers globally
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
