import javax.swing.*;

public class RoleManager {
    public enum Role { ADMIN, HOST }

    public static Role chooseUserRole() {
        Object[] options = {"Admin", "Host"};
        int selection = JOptionPane.showOptionDialog(null, "Vyberte roli", "Vyberte roli", JOptionPane.DEFAULT_OPTION, JOptionPane.QUESTION_MESSAGE, null, options, options[0]);

        if (selection == 0) {
            return Role.ADMIN;
        } else if (selection == 1) {
            return Role.HOST;
        } else {
            System.exit(0);
            return null; // Kód by neměl dosáhnout sem, ale je zde pro úplnost
        }
    }
}
