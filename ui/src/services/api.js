const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function fetchDestinations() {
  const response = await fetch(`${API_BASE_URL}/destinations`)

  if (!response.ok) {
    throw new Error('Could not load destinations.')
  }

  return response.json()
}

export async function predictTourismDemand(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        errorText || 'The prediction service returned an error.'
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Cannot connect to the prediction backend. Make sure app.py is running.'
      )
    }

    throw error
  }
}