import javax.swing.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

public class HodnoceniManager {

    public static void pridejHodnoceni() {
        try {
            Connection connection = DatabaseManager.getConnection();

            int id_student = Integer.parseInt(JOptionPane.showInputDialog("Zadejte ID studenta:"));
            int id_zkouska = Integer.parseInt(JOptionPane.showInputDialog("Zadejte ID zkoušky:"));
            int hodnoceni = Integer.parseInt(JOptionPane.showInputDialog("Zadejte hodnocení (1-5):"));

            // Použití uložené procedury
            String query = "{CALL PridatHodnoceni(?, ?, ?)}";
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setInt(1, id_student);
            callableStatement.setInt(2, id_zkouska);
            callableStatement.setInt(3, hodnoceni);

            boolean hasResults = callableStatement.execute();

            if (!hasResults) {
                JOptionPane.showMessageDialog(null, "Hodnocení bylo úspěšně přidáno.", "Úspěch", JOptionPane.INFORMATION_MESSAGE);
            }

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při přidávání hodnocení: " + e.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }


}
