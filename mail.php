<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Basic Info (Common to all forms)
    $name    = strip_tags(trim($_POST["fullname"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone   = strip_tags(trim($_POST["phone"]));
    $org     = isset($_POST["org_type"]) ? strip_tags(trim($_POST["org_type"])) : "Not Specified";
    
    // 2. The "Smart" Logic (Detects if it's a Package Order or a General Message)
    $package = isset($_POST["package"]) ? strip_tags(trim($_POST["package"])) : "General Inquiry";
    $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : "No specific message provided (Package Selection Only).";

    // 3. Setup Recipient
    $to = "namelevate@gmail.com";
    
    // 4. Dynamic Subject Line
    if ($package !== "General Inquiry" && $package !== "None") {
        $subject = "NEW ORDER: $package - $name";
    } else {
        $subject = "New General Inquiry from $name";
    }

    // 5. Build the Email Body
    $body = "--- NAMELEVATE PROJECT DIAGNOSIS ---\n\n";
    $body .= "Client Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n\n";
    $body .= "Organization: $org\n";
    $body .= "Selected Interest/Package: $package\n\n";
    $body .= "Detailed Vision/Message:\n$message\n\n";
    $body .= "--- End of Report ---";

    // 6. Headers
    $headers = "From: Namelevate System <$email>";

    // 7. Integrated Redirect to Thank You Page
    // We send everyone to thanks.html for a professional confirmation
    if (mail($to, $subject, $body, $headers)) {
        header("Location: thanks.html");
        exit(); // Always use exit() after a header redirect
    } else {
        // Clinical error handling
        echo "Transmission Error. Please contact Ottoo directly at namelevate@gmail.com";
    }
} else {
    // Prevent direct access to this script
    header("Location: index.php");
    exit();
}
?>

<?php /*
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Sanitize all incoming data
    $name = strip_tags(trim($_POST["fullname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $org = strip_tags(trim($_POST["org_type"]));
    
    // 2. Capture the Hidden Package Field
    // If the 'package' field is empty, we label it as a 'General Inquiry'
    $package = isset($_POST["package"]) ? strip_tags(trim($_POST["package"])) : "General Inquiry";
    
    // 3. Message (For the modal, this might be empty, so we provide a default)
    $message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : "User selected a specific package via the pricing grid.";

    // 4. Your Details
    $recipient = "namelevate@gmail.com";
    $subject = "Namelevate Order: $package from $name";

    // 5. Build the Email Body (Clinical Style)
    $email_content = "--- NEW PROJECT DIAGNOSIS ---\n\n";
    $email_content .= "SELECTED PLAN: " . strtoupper($package) . "\n";
    $email_content .= "-----------------------------\n";
    $email_content .= "Client Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Organization: $org\n\n";
    $email_content .= "Message/Notes:\n$message\n\n";
    $email_content .= "--- End of Report ---";

    // 6. Email Headers
    $email_headers = "From: Namelevate System <$email>";

    // 7. Send and Redirect
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Redirect back to the pricing section with a success message
        header("Location: index.php?status=success#pricing");
    } else {
        header("Location: index.php?status=error#pricing");
    }
} else {
    header("Location: index.php");
}
?>  */



