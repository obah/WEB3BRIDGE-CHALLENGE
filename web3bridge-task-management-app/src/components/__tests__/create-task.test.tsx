import { render, screen, fireEvent } from "@testing-library/react";
import { CreateTask } from "../create-task";

describe("Create Tasks", () => {
  it("renders the form to create task and saves new tasks", () => {
    const handleSave = jest.fn();
    render(<CreateTask onSave={handleSave} />);

    const titleInput = screen.getByLabelText(/title/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const submitButton = screen.getByText(/add task/i);

    fireEvent.change(titleInput, { target: { value: "New Task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-12-31" } });
    fireEvent.click(submitButton);

    expect(handleSave).toHaveBeenCalledWith({
      id: expect.any(Number),
      title: "New Task",
      dueDate: "2024-12-31",
      completed: false,
    });
  });
});
