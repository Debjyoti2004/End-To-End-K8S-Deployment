# Replace with your cluster name and region
CLUSTER_NAME="<YOUR_CLUSTER_NAME>"
REGION="<YOUR_REGION>"

# The ARN of the IAM role for the EBS CSI driver
# Make sure to replace with your account ID
ROLE_ARN="arn:aws:iam::<YOUR_ACCOUNT_ID>:role/AmazonEKS_EBS_CSI_DriverRole"

# Check if the add-on is already installed
aws eks list-addons --cluster-name $CLUSTER_NAME --region $REGION

# If not installed, add it
aws eks create-addon --cluster-name $CLUSTER_NAME --region $REGION --addon-name aws-ebs-csi-driver \
  --service-account-role-arn $ROLE_ARN