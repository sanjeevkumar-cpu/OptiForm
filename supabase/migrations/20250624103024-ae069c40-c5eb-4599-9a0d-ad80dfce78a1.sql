
-- First, let's check if the feedback table exists and has the right structure
-- Then insert some sample data for testing

INSERT INTO public.feedback (rating, text, email, phone, date, sentiment, is_spam) VALUES
(5, 'Amazing service! Really loved the experience and would definitely recommend to others.', 'john@example.com', '+1234567890', '2024-01-15', 'positive', false),
(4, 'Great product, fast delivery. Minor issues with packaging but overall satisfied.', 'sarah@example.com', NULL, '2024-01-14', 'positive', false),
(2, 'Not satisfied with the quality. Expected much better for the price paid.', 'mike@example.com', '+9876543210', '2024-01-13', 'negative', false),
(5, 'Excellent customer service! The team was very helpful and responsive.', NULL, '+5555555555', '2024-01-12', 'positive', false),
(3, 'Average experience. Nothing special but nothing terrible either.', 'jane@example.com', NULL, '2024-01-11', 'neutral', false),
(1, 'Terrible experience. Would not recommend. Waste of money and time.', 'angry@example.com', '+1111111111', '2024-01-10', 'negative', false),
(4, 'Good value for money. Quick delivery and decent quality.', NULL, NULL, '2024-01-09', 'positive', false),
(5, 'Perfect! Exactly what I was looking for. Will definitely buy again.', 'happy@example.com', '+2222222222', '2024-01-08', 'positive', false),
(2, 'Buy our amazing products now! Special discount! Click here!', 'spam@fake.com', '+0000000000', '2024-01-07', 'neutral', true),
(4, 'Really good experience overall. Minor room for improvement but satisfied.', 'customer@example.com', NULL, '2024-01-06', 'positive', false);
