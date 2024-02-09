import java.sql.*;
import javax.swing.JOptionPane;

public class RozvrhManager {
    public static void zobrazitRozvrh(int idStudent) {
        try {
            Connection connection = DatabaseManager.getConnection();

            String query = "{CALL ZobrazitRozvrhStudenta(?)}"; // Volání uložené procedury
            CallableStatement callableStatement = connection.prepareCall(query);
            callableStatement.setInt(1, idStudent);
            ResultSet resultSet = callableStatement.executeQuery();

            StringBuilder sbPredmety = new StringBuilder("Předměty studenta (ID ").append(idStudent).append("):\n");
            while (resultSet.next()) {
                sbPredmety.append(resultSet.getString("nazev")).append("\n");
            }

            JOptionPane.showMessageDialog(null, sbPredmety.toString(), "Předměty studenta", JOptionPane.INFORMATION_MESSAGE);

            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(null, "Chyba při získávání předmětů studenta: " + e.getMessage(), "Chyba", JOptionPane.ERROR_MESSAGE);
        }
    }
}
