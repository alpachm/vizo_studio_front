// ---------------------------------------------------------------------------
// Contact Service — Submits contact form data to the backend API
// ---------------------------------------------------------------------------
import type {
  ContactFormData,
  ContactPayload,
} from "../interfaces/HomeScreenInterface";

/** Response shape returned by the backend on successful submission */
export interface ContactServiceResponse {
  message: string;
}

/**
 * Transforms the client-side contact form data into the backend payload shape.
 */
function mapToPayload(data: ContactFormData): ContactPayload {
  return {
    app_type: data.selectedInterests,
    fullname: data.fullName,
    email: data.email,
    phone: Number(data.phone),
    company_name: data.company ?? "",
    about_project: data.projectDetails,
    project_budget: data.budget,
  };
}

/**
 * Sends the contact form data to the backend endpoint.
 *
 * @param data - The validated contact form data from the UI layer.
 * @returns A promise resolving to the backend's JSON response.
 * @throws {Error} If the network request fails or the server returns a non‑2xx status.
 */
export async function submitContact(
  data: ContactFormData,
): Promise<ContactServiceResponse> {
  const baseUrl = import.meta.env.VITE_BASE_URL as string;

  if (!baseUrl) {
    throw new Error(
      "VITE_BASE_URL is not defined in the environment variables.",
    );
  }

  const url = `${baseUrl}/api/contact`;
  const payload = mapToPayload(data);

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    throw new Error(
      "Network error: Unable to reach the server. Please check your connection and try again.",
      { cause: networkError },
    );
  }

  if (!response.ok) {
    let serverMessage: string;

    try {
      const errorBody = (await response.json()) as {
        message?: string;
      };
      serverMessage =
        errorBody.message ?? `Server responded with status ${response.status}`;
    } catch {
      serverMessage = `Server responded with status ${response.status}`;
    }

    throw new Error(serverMessage);
  }

  return (await response.json()) as ContactServiceResponse;
}