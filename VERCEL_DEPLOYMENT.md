# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Add New..." → "Project"
3. Import your GitHub repository: `SmartNodeX/cipher-home-loans`

### Step 2: Configure Project Settings

1. **Framework Preset**: Select "Vite" (should auto-detect)
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, add these environment variables:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_infura_key_here
```

**How to add environment variables:**
1. Go to your project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add each variable with its value
5. Select "Production", "Preview", and "Development" for all variables

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to your project settings
2. Click on "Domains" tab
3. Add your custom domain
4. Follow the DNS configuration instructions

## Post-Deployment Configuration

### 1. Verify Environment Variables

Check that all environment variables are properly set:
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- `NEXT_PUBLIC_INFURA_API_KEY`

### 2. Test Application

1. Open your deployed application
2. Click "Connect Wallet"
3. Verify that wallet connection works
4. Test the loan application flow

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables Not Working**:
   - Ensure variables start with `NEXT_PUBLIC_`
   - Redeploy after adding new variables
   - Check variable names for typos

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure you're on the correct network

## Performance Optimization

1. **Enable Vercel Analytics**:
   - Go to project settings
   - Enable "Vercel Analytics"
   - Monitor performance metrics

2. **Configure Caching**:
   - Add `vercel.json` for custom caching rules
   - Optimize static assets

## Security Considerations

1. **Environment Variables**:
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable encryption
   - Rotate keys regularly

2. **Application Security**:
   - Use HTTPS only
   - Implement proper CORS policies
   - Validate all user inputs

## Monitoring and Maintenance

1. **Set up monitoring**:
   - Enable Vercel Analytics
   - Set up error tracking
   - Monitor performance metrics

2. **Regular updates**:
   - Keep dependencies updated
   - Monitor security advisories
   - Test deployments in preview environment

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] Application functionality verified
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Performance optimized
- [ ] Security measures implemented