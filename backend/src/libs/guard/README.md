**File Descriptions:**

- `guard.module.ts`: This file contains the implementation of the Auth Guard as a module. It can be imported into the `AppModule` to apply authentication across the entire application or into individual modules as needed.
- `jwt.guard.ts`: This file defines the Auth Guard specifically for handling JWT token authentication, ensuring that requests are properly authenticated using JWT tokens.
- `jwt.strategy.ts`: This file includes the logic for validating and verifying JWT tokens, ensuring that the tokens are correctly processed and authenticated.
- `jwt.types.ts`: This file provides type definitions related to JWT and the Auth Guard, facilitating type safety and clarity in the authentication implementation.