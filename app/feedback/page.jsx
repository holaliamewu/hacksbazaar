'use client'

import React,{ useState } from 'react';
import { database } from '@/lib/shared/firebase';
import { ref, push } from 'firebase/database';


// Initialize Firebase

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async () => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const feedbackRef = ref(database, 'feedback');
      await push(feedbackRef, {
        name,
        feedback,
        timestamp: Date.now(),
      });
      setStatus('success');
      setName('');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-md h-screen mx-auto  p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">feedback form</h2>
        <p className="text-gray-600">please help us get better. please share your thoughts with us.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-semibold">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block font-semibold">Feedback</label>
          <textarea
            id="feedback"
            placeholder="Your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
      {status === 'success' && (
        <div className="text-green-600 text-center mt-4">Feedback submitted successfully!</div>
      )}
      {status === 'error' && (
        <div className="text-red-600 text-center mt-4">Error submitting feedback. Please try again.</div>
      )}
    </div>
  );
}
