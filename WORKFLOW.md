# AI-Assisted Workflow Comparison

## Round One: Vague Prompt

In the first round, I used a simple prompt:

"Create a settings form in React."

The AI generated a working settings form, but the instructions were incomplete. The output required more manual review because important details such as validation, accessibility, and edge cases were not clearly handled.

The generated implementation worked, but it lacked some engineering considerations expected in a production project.

## Round Two: Precise Prompt

In the second round, I used a detailed prompt containing project context, requirements, constraints, accessibility expectations, and a verification process.

The AI produced a more structured solution with clearer component organization and better attention to user experience.

The second workflow required more time while writing the prompt, but reduced the amount of debugging and review needed afterward.

## Comparison

The main differences between both approaches were:

- The vague prompt produced a basic implementation with fewer requirements considered.
- The precise prompt resulted in better structure and more predictable output.
- Accessibility requirements were handled better in the second approach.
- The second approach required less manual correction.

The precise workflow improved correctness because the AI had clear expectations before generating code.

## AI Mistake Found

During review of the generated code, I found that the AI did not completely handle all accessibility details initially. Some form elements needed additional checking to ensure labels and inputs were properly connected.

This was fixed during the review process.

## Lessons Learned

AI-generated code should not be accepted without verification. Providing specifications, examples, constraints, and review steps leads to better results.

For future development tasks, I will use a plan → implement → verify workflow instead of relying on a single vague request.