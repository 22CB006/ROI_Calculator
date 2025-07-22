# Email Setup Instructions

To enable email functionality in the ROI Calculator, you need to configure your email service credentials.

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to your Google Account settings
   - Select "Security"
   - Under "Signing in to Google," select "App passwords"
   - Generate a new app password for "Mail"
3. **Update Environment Variables**:
   - Open `.env.local` file in the project root
   - Replace the placeholder values:
     ```
     EMAIL_USER=your-actual-email@gmail.com
     EMAIL_PASS=your-generated-app-password
     ```

## Other Email Services

If you're using a different email service, update the transporter configuration in `src/app/api/send-email/route.ts`:

### Outlook/Hotmail

```javascript
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Custom SMTP

```javascript
const transporter = nodemailer.createTransport({
  host: "your-smtp-server.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Security Note

- Never commit your `.env.local` file to version control
- The `.env.local` file is already included in `.gitignore`
- Use app-specific passwords instead of your main account password

## Testing

1. Fill out the ROI calculator form with valid data
2. Enter your email address
3. Click "Calculate ROI" - this will send the report to the entered email
4. On the results page, click "Email me the full report" to resend the report

## Troubleshooting

- **Email not sending**: Check your environment variables and email service configuration
- **Authentication failed**: Ensure you're using an app password (for Gmail) or correct credentials
- **Port issues**: Some networks block email ports; try different port configurations
