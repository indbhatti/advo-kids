export const getUser = async (data) => {
  const dataToPost = { username: data.user.email }
  if (dataToPost) {
    try {
      const response = await fetch("http://localhost:3000/api/get-user", {
        method: "POST",
        body: JSON.stringify(dataToPost),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to Post');
      }

      const result = await response.json();
      return result.user

    }
    catch (error) {
      console.error('Error Posting:', error);
    }
  }
}

export const getQues = async (storylineNumber: number, number: number, language: string) => {
  const dataToPost = { storylineNumber, number, language }
  if (dataToPost) {
    try {
      const response = await fetch("http://localhost:3000/api/get-ques", {
        method: "POST",
        body: JSON.stringify(dataToPost),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to Post');
      }

      const result = await response.json();
      return result.question

    }
    catch (error) {
      console.error('Error Posting:', error);
    }
  }
}

export const getQuestionSet = async (storylineNumber: number, language: string) => {
  const dataToPost = { storylineNumber, language }
  if (dataToPost) {
    try {
      const response = await fetch("http://localhost:3000/api/get-question-set", {
        method: "POST",
        body: JSON.stringify(dataToPost),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to Post');
      }

      const result = await response.json();
      return result.questions

    }
    catch (error) {
      console.error('Error Posting:', error);
    }
  }
}

export const getStoryline = async (number: number) => {
  const dataToPost = { number }
  if (dataToPost) {
    try {
      const response = await fetch("http://localhost:3000/api/get-storyline", {
        method: "POST",
        body: JSON.stringify(dataToPost),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to Post');
      }

      const result = await response.json();
      return result.storyline

    }
    catch (error) {
      console.error('Error Posting:', error);
    }
  }
}

export const getStorylines = async (language: string) => {
  const dataToPost = { language }
  if (dataToPost) {
    try {
      const response = await fetch("http://localhost:3000/api/get-storylines", {
        method: "POST",
        body: JSON.stringify(dataToPost),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Failed to Post');
      }

      const result = await response.json();
      return result.storylines

    }
    catch (error) {
      console.error('Error Posting:', error);
    }
  }
}

